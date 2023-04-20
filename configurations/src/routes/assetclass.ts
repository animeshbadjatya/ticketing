import { requireAuth, RequestValidationError, BadRequestError } from "@themicroledger/ticketing-common";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { AssetClass } from "../entity/assetclass";
import { AppDataSource } from "../data-source";

const router = express.Router();
const assetClassRepo = AppDataSource.getRepository(AssetClass);

router.post("/api/configurations/new",// requireAuth,
    [
        body('assetClass').trim().notEmpty().withMessage('Asset Class Required'),
        body('assetDescription').trim().notEmpty().withMessage('Asset Description Required')
    ],
    async (req: Request, res: Response) => {
        console.log('Before validation :', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        console.log('After validation :', req.body);
        const { assetClass, assetDescription } = req.body;

        const exitingAssetClass = await assetClassRepo.findOneBy({
            assetClass
        })
        if (exitingAssetClass) {
            throw new BadRequestError('Record already exists');
        }
        if (!exitingAssetClass) {
            console.log("Inserting a new asset class into the database...")
            const assetClasstbl = new AssetClass()
            assetClasstbl.assetClass = assetClass;
            assetClasstbl.assetDescription = assetDescription;
            await assetClassRepo.save(assetClasstbl)
            console.log("Saved a new asset class with id: " + assetClasstbl.id)
            console.log("Here Done!!!")
            res.status(200).send(assetClasstbl);
        }
    });

router.post("/api/configurations/edit/:id",// requireAuth,
[
    body('assetClass').trim().notEmpty().withMessage('Asset Class Required'),
    body('assetDescription').trim().notEmpty().withMessage('Asset Discription Required')
], 
    async (req :Request, res : Response) => {
        console.log('Before validation :' ,req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    console.log('After validation :',req.body);
    const { assetClass, assetDescription} = req.body;

    console.log("Inserting a new asset class into the database...")
    const assetClasstbl = new AssetClass()
    assetClasstbl.assetClass = assetClass;
    assetClasstbl.assetDescription = assetDescription;
    await AppDataSource.manager.save(assetClasstbl)
    console.log("Saved a neew asset class with id: " + assetClasstbl.id)

    console.log("Loading asset class from the database...")
    const users = await AppDataSource.manager.find(AssetClass)
    console.log("Loaded asset class: ", users)


    console.log("Here Done!!!")
   res.send(assetClasstbl);


});

router.get("/api/configurations/getall",// requireAuth, 
    async (req: Request, res: Response) => {
        console.log('Before validation of Get All :', req.body);

        console.log("Getting all asset class from the database...")

        console.log("Loading asset class from the database...")
        const assetClasstbl1 = await assetClassRepo.find();
        console.log("Loaded asset class: ", assetClasstbl1);


        console.log("Loading Done!!!")
        res.send(assetClasstbl1);
    });

// router.post("/api/configurations/delete",// requireAuth,
// [
//     body('assetClass').trim().notEmpty().withMessage('Asset Class Required'),
//     body('assetDescription').trim().notEmpty().withMessage('Asset Discription Required')
// ], 
//     async (req :Request, res : Response) => {
// //         console.log('Before validation :' ,req.body);
// //     const errors = validationResult(req);
// //     if(!errors.isEmpty()) {
// //         throw new RequestValidationError(errors.array());
// //     }
// //     console.log('After validation :',req.body);
// //     const { assetClass, assetDescription} = req.body;

// //     console.log("Inserting a new asset class into the database...")
// //     const assetClasstbl = new AssetClass()
// //     assetClasstbl.assetClass = assetClass;
// //     assetClasstbl.assetDescription = assetDescription;
// //     await AppDataSource.manager.save(assetClasstbl)
// //     console.log("Saved a neew asset class with id: " + assetClasstbl.id)

// //     console.log("Loading asset class from the database...")
// //     const users = await AppDataSource.manager.find(AssetClass)
// //     console.log("Loaded asset class: ", users)


// //     console.log("Here Done!!!")
// //    res.send(assetClasstbl);


// });

export { router as assetClassRouter };