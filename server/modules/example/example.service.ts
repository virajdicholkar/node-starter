import { ExampleModel, ExampleInterface } from "./example.model";
export default class ExampleService {

    async create(example: ExampleInterface) {
        const result = await ExampleModel.create(example);
        return result._id;
    }

    async get() {
        return await ExampleModel.find().lean();
    }

    async getById(id: string) {
        return await ExampleModel.findById(id);
    }

    async updateById(id: string, updatedExample: ExampleInterface) {
        const result = await ExampleModel.findByIdAndUpdate(id, updatedExample);
        return true;
    }

    async deleteById(id: string) {
        const result = await ExampleModel.findByIdAndRemove(id);
        return true;
    }
}