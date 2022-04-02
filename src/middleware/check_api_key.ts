import "dotenv/config.js";

export const check_api_key = (req, res, next) => {
    if(req.headers.authorization === process.env.api_key){
        next();
    } else {
        return res.json({
            error: "Invalid API key"
        });
    }
};