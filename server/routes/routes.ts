
import express = require('express')

import { ExampleController } from "../modules/example/example.controller";

class Routes {
    private router = express.Router();

    public routes(): express.Router {
        const exampleController = new ExampleController(this.router);
        return this.router;
    }
}

export const routes = new Routes();