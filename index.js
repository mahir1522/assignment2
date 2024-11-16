const express = require("express");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 3000;


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


let db;
( async ()=>{
    db = await sqlite.open({
        filename: './greetings.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        create table if not exists Greetings(
        id integer primary key autoincrement,
        timeOfDay text not null,
        language text not null,
        greetingMessage text not null,
        tone text not null
        )`
    );
    
    await db.run(`
        insert into Greetings (timeOfDay, language, greetingMessage, tone)
        values
        ('Morning', 'English', 'Good morning', 'Formal'),
        ('Afternoon', 'French', 'Bonjour!', 'Casual'),
        ('Evening', 'Spanish', 'Buenas Tardos', 'Formal')
        `);
})();

// post api endpoints: /api/greet
app.post('/api/greet', async (req,res) =>{

    try{
        const greetingReq = new GreetingRequest(req.body.timeOfDay, req.body.language, req.body.tone);

        const greeting = await db.get(
            ` select greetingMessage from greetings where timeOfDay = ? and language = ? and tone = ?`,
            [greetingReq.timeOfDay, greetingReq.language, greetingReq.tone]
        );

        if(greeting){
            const greetingRes = new GreetingResponse(greeting.greetingMessage);
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
        const timeOfDay = await db.all(`select timeOfDay from greetings`);
        res.json({ timeOfDay: timeOfDay.map(row => row.timeOfDay )});
    }catch (error){
        res.status(500).json({error: error.message });
    }
});

// get all languages endpoint: /api/languages
app.get('/api/languages', async (req, res) =>{
    try{
        const language = await db.all(`select language from greetings`);
        res.json({ Languages: language.map(row => row.language )});
    }catch (error){
        res.status(500).json({error: error.message });
    }
});

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});