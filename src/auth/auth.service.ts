import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService{

    signUp(){
        return {msg: "I have sign up"}
    }

    signin(){
        return {msg: "I have sign In"}
    }
}