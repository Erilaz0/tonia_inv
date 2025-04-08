import Users from "../../../../../../../services/invitation.services."
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function PUT( req , { params } ){
    const cookies = req.cookies
    if( !cookies || !params.id || !params.number ){
        return NextResponse.json({ ERROR : "NO COOKIE OR PARAMS ID" })
    }
    else{
        const cookie = cookies.get( "authToken" )
        if( !cookie ){
            return NextResponse.json({ ERROR : "WRONG COOKIES" })
        }
        else{
            try{
                const decoded = jwt.verify( cookie.value , process.env.SECRET_KEY );
                if( !decoded || decoded.id !== params.id ){
                    return NextResponse.json({ ERROR : "NO AUTHORIZED" })
                }
                else{
                    const guest = await Users.createTable( params.id , params.number )
                    if( !guest ){
                        return NextResponse.json({ ERROR : "CANNOT CREATE TABLE" })
                    }
                    else{
                        return NextResponse.json({ message : guest })
                    }
                }
            }
            catch{
                return NextResponse.json({ ERROR : "NO AUTHORIZED" })
            }
        }
    }
}