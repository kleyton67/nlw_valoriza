import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";
import { Request, Response } from "express"

class ListUserReceiveComplimentsController {
    async handle(request: Request, response: Response) {
        
        const { user_id } = request;

        const listUserComplimentsReceiverService = new ListUserReceiveComplimentsService();

        const compliments = await listUserComplimentsReceiverService.execute(user_id);

        return response.json(compliments)
    }
}

export { ListUserReceiveComplimentsController }