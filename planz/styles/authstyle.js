import { StyleSheet } from "react-native"

const authstyle = StyleSheet.create({
    auth_input:{
        backgroundColor:"#f5f5f5",
        width:"90%",
        borderRadius:14,
    paddingVertical:18,
    paddingHorizontal:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:15

    },
    errorContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Lighter red background color with reduced opacity
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
 
        marginBottom: 10,
        width:"90%",
        textAlign:"center",

        borderColor: 'rgba(128, 0, 0, 0.7)', 
    marginBottom: 10,
  },
  errorMessage: {
    color: 'rgba(128, 0, 0, 0.7)', 
    fontSize: 14, 
    fontWeight: 'normal',  
  },

})


export {
    authstyle
}