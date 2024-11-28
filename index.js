require('dotenv').config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const PORT = 3000;

module.exports = app;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)


class GreetingRequest{
    constructor(timeOfDay, language, tone){
        this.timeOfDay = timeOfDay;
        this.language = language;
        this.tone = tone
    }
}


class GreetingResponse{
    constructor(greetingMessage){
        this.greetingMessage = greetingMessage;
    }
}

function seedData(){
    async() =>{
        try{
            const {data, error} = await supabase.from('Greetings').select('id');

            if(error) throw error;

            if(data.length === 0){

                const { error: insertError} = await supabase.from('Greetings').insert([
                    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'Good morning', tone: 'Formal'},
                    { timeOfDay: 'Afternoon', language: 'French', greetingMessage: 'Bonjour!', tone: 'Casual'},
                    { timeOfDay: 'Evening', language: 'Spanish', greetingMessage: 'Buenas Tardes', tone: 'Formal'},
                ]);

                if(insertError){
                    console.log("error in adding data")
                }else{
                    console.log("data added")
                }

            }else{
                console.log("we already have data here");
            }
        }catch(error){
            console.log(error.message);
        }
    }
}

seedData();

// post api endpoints: /api/greet
app.post('/api/greet', async (req,res) =>{

    try{
        const greetingReq = new GreetingRequest(req.body.timeOfDay, req.body.language, req.body.tone);


        const { data, error } = await supabase.from('Greetings').select('greetingMessage')
                                    .eq('timeOfDay', greetingReq.timeOfDay)
                                    .eq('language', greetingReq.language)
                                    .eq('tone', greetingReq.tone)

        if(error) throw error;

        if(data){
            const greetingRes = new GreetingResponse(data.greetingMessage);
            return res.json(greetingRes);
        }
        else{
            return res.status(404).json({error: 'No data avaible'});
        }
    }catch(error){
        return res.status(400).json({error: error.message});
    }
});

// get all times of day endpoint: /api/timesOfDay
app.get('/api/timesOfDay', async (req, res) =>{
    try{
        const {data, error} = await supabase.from('Greetings').select('timeOfDay');
        if(error) throw error;
        res.json(data.map(row => row.timeOfDay ));
    }catch (error){
        res.status(500).json({error: error.message });
    }
});

// get all languages endpoint: /api/languages
app.get('/api/languages', async (req, res) =>{
    try{
        const {data, error} = await supabase.from('Greetings').select('language');
        if(error) throw error;
        res.json(data.map(row => row.language ));
    }catch (error){
        res.status(500).json({error: error.message });
    }
});

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});