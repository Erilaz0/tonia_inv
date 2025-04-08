import { NextResponse } from "next/server"
import User from "../../../../services/invitation.services."
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export async function POST( req ){
   const body = await req.json()
   if( !body.email && !body.password ){
    return NextResponse.json( { ERROR : "AUTHENTICATION FAILED FOR DATA REQUIREMENT" } )
   }
   else{
    const verifyEmail = await User.getByEmail( body.email )
    if( !verifyEmail ){
      return NextResponse.json( { EMAIL_FAILED : "EMAIL DOESN'T EXISTS" } )
    }
    else{
      const compare = await bcrypt.compare( body.password , verifyEmail.password )
      if( !compare ){
        return NextResponse.json( { PASSWORD_FAILED : "INCORRECT PASSWORD" } ) 
      }
      else{
        const token = jwt.sign( { email: verifyEmail.email, id: verifyEmail._id }, 
          process.env.SECRET_KEY, 
          { expiresIn: '1d' }
        );

        const response = NextResponse.json( { MESSAGE: "200OK" , UID : verifyEmail._id } );

        response.headers.set(
          "Set-Cookie",
          `authToken=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}` 
        );
      
        return response
      }
    }
   }
}