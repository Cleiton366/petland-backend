import "dotenv/config.js";
export const CheckSession = (req, res, next) => {
    try {
        if (process.env.isAuthenticated) {
            next();
        }else if(req.session.passport.user){
            next();
        }
    } catch (error) {
        return res.send(401, {
            Status: "Error",
            Message: "User not authenticated",
        });
    }
};