import { NextResponse } from "next/server";
import Users from "../../../../../services/invitation.services.";
import jwt from "jsonwebtoken";


export async function PUT( req , { params } ){
    const data = await req.json()
    const cookies = req.cookies
    if( !cookies || !params.id || !data.guest ){
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
                    const addGuest = await Users.addTable( params.id , data.table , data.guest )
                    if( !addGuest ){
                        return NextResponse.json({ ERROR : "CANNOT ADD GUEST TO TABLE" })
                    }
                    else{
                        return NextResponse.json({ message : "200OK" })
                    }
                }
            }
            catch{
                return NextResponse.json({ ERROR : "NO AUTHORIZED" })
            }
        }
    }
}