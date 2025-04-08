import { NextResponse } from "next/server";
import Users from "../../../../../services/invitation.services.";
import jwt from "jsonwebtoken";

export async function GET( req , { params } ){
    
    const cookies = req.cookies
    if( !cookies || !params.id ){
        return NextResponse.json({ ERROR : "NO COOKIE OR PARAMS ID" })
    }
    else{
        const cookie = cookies.get( "authToken" )
        if( !cookie ){
            return NextResponse.json({ ERROR : "WRONG COOKIES" })
        }
        else{
            const guests = await Users.getGuests( params.id )
            try{
                const decoded = jwt.verify( cookie.value , process.env.SECRET_KEY );
                if( !decoded  || decoded.id !== params.id ){
                    console.log("no")
                    return NextResponse.json({ ERROR : "NO AUTHORIZED" })
                }
                else{
                    console.log("si")
                    return NextResponse.json({ message : guests })
                }
            }
            catch{
                return NextResponse.json({ ERROR : "NO AUTHORIZED" })
            }
        }
    }
 }


export async function PUT( req , { params } ){
    const data = await req.json()
    const cookies = req.cookies
    if( !cookies || !params.id ){
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
                if( !decoded ){
                    return NextResponse.json({ ERROR : "NO AUTHORIZED" })
                }
                else{
                    const guests = await Users.deleteGuest( params.id , data.email )
                    if( !guests ){
                        return NextResponse.json({ ERROR : "CANNOT DELETE GUEST" })
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