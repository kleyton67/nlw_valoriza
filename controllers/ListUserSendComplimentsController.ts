import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";
import { Request, Response } from "express"

class ListUserSendComplimentsController {
    async handle(request: Request, response: Response) {
        
        const { user_id } = request;

        console.log(request)

        const listUserComplimentsSendService = new ListUserSendComplimentsService();

        const compliments = await listUserComplimentsSendService.execute(user_id);

        return response.json(compliments)
    }
}

export { ListUserSendComplimentsController }