import { Router } from 'express';
import { addQuestion,submitTest , getQuestion } from '../controllers/personalityTestController.js'
const router = Router();


//@desc get question
//@route get /question/:number
//@access public

router.get('/question/:number',getQuestion);

//@desc post question
//@route post /question
//@access public

router.post('/question',addQuestion);

//@desc submit test
//@route post /test
//@access public

router.post('/test',submitTest);


export default router;