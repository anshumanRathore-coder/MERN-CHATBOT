import { Configuration } from "openai"

export const openAiCongigation=()=>{
    const config=new Configuration({
        apiKey:process.env.OPEN_AI_SECRET,
        organization:process.env.OPEN_AI_ORGANIZATION
    })
    return config
}