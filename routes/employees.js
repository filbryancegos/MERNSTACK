const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} = require('../controllers/employeeController')

router.post('/', protect, createEmployee)
router.get('/', getEmployees)
router.delete('/:id', protect, deleteEmployee)
router.post('/update/:id', protect, updateEmployee)

module.exports = router;
