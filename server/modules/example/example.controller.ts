import { Request, Response, Router } from "express";
import ExampleService from "./example.service";
import { ExampleInterface } from "./example.model";

export class ExampleController {
    exampleService = new ExampleService();
    router: Router;

    constructor(router: Router) {
        this.router = router;
        this.setRoutes();
    }

    private setRoutes() {
        const exampleRouter = Router();
        exampleRouter
            .get('', this.get)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.updateById)
            .delete('/:id', this.deleteById);

        const commonRoute = '/example';
        this.router.use(commonRoute, exampleRouter);
    }

    private get = async (req: any, res: Response) => {
        const result = await this.exampleService.get()
        res.status(200).json(result);
    }

    private getById = async (req: Request, res: Response) => {
        try {
            const exampleId: string = req.params.id;
            const result = await this.exampleService.getById(exampleId);
            res.status(200).json(result)
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }

    private create = async (req: Request, res: Response) => {
        try {
            const body: ExampleInterface = req.body;
            if (!body.name) {
                throw {
                    code: 400,
                    message: 'Name not found!'
                }
            }
            const example = await this.exampleService.create(body);
            res.status(200).json({ message: 'Example created successfully.', _id: example._id });
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }

    private updateById = async (req: Request, res: Response) => {
        try {
            const updatedExample: ExampleInterface = req.body;
            const id: string = req.params.id;
            const result = await this.exampleService.updateById(id, updatedExample);
            res.status(201).json({ message: "Example updated successfully." })
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }

    private deleteById = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const result = await this.exampleService.deleteById(id);
            res.status(200).json({ message: "Example deleted successfully" })
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }
}