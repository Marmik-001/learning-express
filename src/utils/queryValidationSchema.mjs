export const queryValidationSchema = {
    filter:{
        isString:{
            errorMessage:"query must be a string"
        },
        notEmpty:{
            errorMessage:"query must not be empty"
        },
        

    },
    value:{
        isString:{
            errorMessage:"value must be a string"
        },
        notEmpty:{
            errorMessage:"value must not be empty"
        }
    }
}