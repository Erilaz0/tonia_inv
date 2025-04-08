import mongoose from "mongoose";

const usersCollection = "users";
const usersSchema = new mongoose.Schema({

    user : { type : String , required : true },
    email : { type : String , required : true },
    password : { type : String , required : true },
    event_theme : { type : String },
    event_theme_font : { type : String },
    last_connection : { type : String , required : false },
    model : { type : String , required : true },
    price : { type : String , required : true },
    names : { type : String },
    message : { type : String },
    names_font : { type : String },
    music : { type : String , required : true },
    party_address : { type : String },
    event_address : { type : String },
    event_text : { type : String },
    party_text : { type : String },
    account_text : { type : String },
    dress_code : { type : String },
    bar : { type : String }, 
    date : { type : String },
    kids : { type : String },
    gender : { type : String },
    all_text : {
        text1 : { type : String , required : false},
        text2 : { type : String , required : false},
        text3 : { type : String , required : false},
        text4 : { type : String , required : false},
        text5 : { type : String , required : false},
        text6 : { type : String , required : false},
    },
    images : {
        imagen1 : { type : String , required : false},
        imagen2 : { type : String , required : false},
        imagen3 : { type : String , required : false},
        imagen4 : { type : String , required : false},
        imagen5 : { type : String , required : false},
        imagen6 : { type : String , required : false},
        imagen7 : { type : String , required : false}
     },
    guests : [ { 
         name : { type : String , required : false } ,
         diet : { type : String , required : false } , 
         email : { type : String , required : false } ,
         music : { type : String , required : false } , 
         table : { type : String , required : false , default : "Sin Mesa"},
         message : { type : String , required : false },
         attendance : { type : String , required : false } 
        } ],
    guestTable : [
        {
            table_name : { type : Number , required : true },
            guests : [
                {
                    name : { type : String , required : false },
                    diet : { type : String , required : true , default : "none" },
                    email : { type : String , required : false }
                }
            ]

        }
    ]
});


const usersModel = mongoose.models.users || mongoose.model( usersCollection , usersSchema )

export default usersModel