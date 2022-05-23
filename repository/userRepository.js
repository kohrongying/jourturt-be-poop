import User from "../domain/user.js";
import { getItem } from "../services/ddbService.js";

const TABLE_NAME = "ddb-last-poop-dev-users"

const UserRepository = {
    get: async(email) => {
        const res = await getItem(TABLE_NAME, {
            Email: email,
        })
        return new User(res.Item.Id, res.Item.Name, res.Item.Email)
    },
}

export default UserRepository;