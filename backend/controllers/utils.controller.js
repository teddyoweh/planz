 
   
const axios = require('axios');
  

const ACCESS_KEY =process.env.ACCESS_KEY
const BASE_URL =process.env.BASE_URL

const OPENAI_API_KEY =process.env.OPENAI_API_KEY
 
const { AutoProcessor, CLIPVisionModelWithProjection, RawImage, AutoTokenizer, CLIPTextModelWithProjection } = require('@xenova/transformers');
 

async function setupCLIPModels() {
  const imageProcessor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch16');
  const visionModel = await CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16', { quantized: false }); // Set quantized to true if needed
  const tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch16');
  const textModel = await CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16', { quantized: false }); // Set quantized to true if needed

  return { imageProcessor, visionModel, tokenizer, textModel };
}



async function generateResponse(prompt) {
    try {
      const openAIResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `info: ${prompt}\ngiven this event info, give me a search prompt that will be used to fetch an image from unsplash for the event image, keep it short and simple please and aesthetically pleasing as well, make sure to include the word 'aesthetic' in the prompt.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = openAIResponse.data.choices[0].message.content;
      const perPage = 10;
      const query = result;
  
      const unsplashResponse = await axios.get(
        `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
  
      return result;
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred.';
    }
  }

let quantized = false;  

 


function cosineSimilarity(A, B) {
  if (A.length !== B.length) throw new Error("A.length !== B.length");
  let dotProduct = 0, mA = 0, mB = 0;
  for (let i = 0; i < A.length; i++) {
    dotProduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  let similarity = dotProduct / (mA * mB);
  return similarity;
}

 

async function generateResponseWithCLIP(prompt) {
const { imageProcessor, visionModel, tokenizer, textModel } = await setupCLIPModels();
 
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "user",
            "content": `info: ${prompt}\ngiven this event info, give me a search prompt that will be used to fetch an image from unsplash for the event image, keep it short and simple please and aesthetically pleasing as well. Make sure to include the word 'aesthetic' in the prompt.`
        }]
    };

    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const searchPrompt = response.data.choices[0].message.content;

    // Use the generated search prompt to fetch images from Unsplash
    const perPage = 10;
    const query = searchPrompt;

    const headers = new Headers({
        "Authorization": `Client-ID ${ACCESS_KEY}`
    });

    const params = new URLSearchParams({
        query,
        per_page: perPage
    });

    const url = `${BASE_URL}?${params.toString()}`;

    try {
        const response = await fetch(url, { method: 'GET', headers });
        const data = await response.json();

        if (data.results) {
    
            const filteredImages = await filterImagesWithCLIP(data.results, visionModel, imageProcessor, tokenizer, prompt);
            return filteredImages;
        } else {
            console.error("Error:", data.errors || 'Unknown error');
            return 'An error occurred';
        }
    } catch (error) {
        console.error("Request error:", error);
        return 'An error occurred';
    }
}

async function filterImagesWithCLIP(images, visionModel, imageProcessor, tokenizer, prompt) {
    const texts = [prompt]; 

    const textInputs = await tokenizer(texts, { padding: true, truncation: true });
    const { text_embeds } = await textModel(textInputs);

 
    const filteredImages = [];

    for (const image of images) {
        const imageURL = image.urls.full;
        const imageObj = await RawImage.read(imageURL);
        const imageInputs = await imageProcessor(imageObj);
        const { image_embeds } = await visionModel(imageInputs);

        const similarity = cosineSimilarity(image_embeds.data, text_embeds.data);

         if (similarity > 0.6) {
            filteredImages.push(imageURL);
        }
    }

    return filteredImages;
}

 

const UtilController = {
    promptImage: async (req, res) => {
        const { prompt } = req.body;
        
        const perPage = 10; 
        const  query= await generateResponse(prompt)
        console.log(query)
        const headers = new Headers({
            "Authorization": `Client-ID ${ACCESS_KEY}`
        });

        const params = new URLSearchParams({
            query,
            per_page: perPage
        });

        const url = `${BASE_URL}?${params.toString()}`;

        try {
            const response = await fetch(url, { method: 'GET', headers });
            const data = await response.json();

            if (data.results) {
                const imageUrls = data.results.map(photo => photo.urls.full);
                res.json({ message: imageUrls });
            } else {
                console.error("Error:", data.errors || 'Unknown error');
                res.status(500).json({ error: "An error occurred" });
            }
        } catch (error) {
            console.error("Request error:", error);
            res.status(500).json({ error: "An error occurred" });
        }
    },
   promptImageWithCLIP :async (req, res) => {
    const response = await generateResponseWithCLIP(req.body.prompt);
    res.json({ message: response });
   }
};

module.exports = UtilController;
