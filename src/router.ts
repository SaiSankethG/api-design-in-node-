import { Router } from 'express'
import { body } from 'express-validator';
import { userIputValidators } from './modules/middleware';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, getUpdate, getUpdates, updateDelete, updateUpdate } from './handlers/update';

const router = Router();

/**
 * Product
 */

router.get('/product' , getProducts)
router.get('/product/:id' , getProduct)
router.put('/product/:id' , body('name').isString() , userIputValidators,  updateProduct)
router.post('/product', body('name').isString() , userIputValidators,  createProduct)
router.delete('/product/:id' , deleteProduct)

/**
 * Update
 */

router.get('/update' , getUpdates)
router.get('/update/:id' , getUpdate)
router.post('/update' , 
    body('title').exists().isString(), 
    body('body').exists().isString() , 
    body('productId').exists().isString(), 
    createUpdate
)
router.put('/update/:id' ,
    body('title').optional(), 
    body('body').optional() ,  
    body('status').isIn(['IN_PROGRESS' , 'LIVE'  ,'DEPRECATED' , 'ARCHIVED']).optional(), 
    body('version').optional(),
    updateUpdate
)
router.delete('/update/:id' , updateDelete)

/**
 * Update point
 */

router.get('/updatepoint' , ()=>{})
router.get('/updatepoint/:id' , ()=>{})
router.post('/updatepoint' , 
    body('name').isString(),
    body('desc').isString(),
    body('updateId').exists().isString(),
    ()=>{}
)
router.put('/updatepoint/:id' ,
    body('name').optional().isString(),
    body('desc').optional().isString(),
    ()=>{}
)
router.delete('/updatepoint/:id' , () => {})

export default router