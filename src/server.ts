import { app } from "./app";
import "dotenv/config";

app.listen(4000 || process.env.PORT, () => {
    console.log("Server is running on port 4000");
});