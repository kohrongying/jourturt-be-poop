import User from "../domain/user.js";
import { ddbService } from "../services/ddbService.js";

const TABLE_NAME = "ddb-last-poop-dev-users"

const parseItem = (item) => {
    return new User(item.Id, item.Name, item.Email)
}

const UserRepository = {
    get: async(email) => {
        const res = await ddbService.getItem(TABLE_NAME, {
            Email: email,
        })
        return parseItem(res.Item)
    },
}

export default UserRepository;