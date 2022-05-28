import React from 'react'
import Stats from './Stats'

export default function Form() {
  const data = [{id: 1,  stats: {accountBalance: 250, updated: "17-05-2022"}}];

  const [formData, setFormData] = React.useState({
      endOfDay: 0,
      amountSpent: 0,
      food: 0,
      gas: 0,
      groceries: 5,
    })
  
  let daysSpend = data[0].stats.accountBalance - formData.endOfDay
  let expenses = parseInt(formData.gas) + parseInt(formData.groceries) + parseInt(formData.food)

  let message = "Please update expenses"
  console.log(expenses, daysSpend)
  if (expenses === daysSpend) {
    message = <span className="success">Well done!</span>
  } else if (expenses > daysSpend ) {
    message = <span className="warning">{`Expenses are greater than ${daysSpend}`}</span>
  } else {
    message = <span className="warning">{`Expenses are less than ${daysSpend}`}</span>
  }


  function handleChange(event) {
    const {name, value} = event.target;

    //Enter balance at the end of the day
      //update state and return new balance and amount spent
      //place amount spent into other category
      //display 3 other categories (other, groceries, gas, food & drinks)
      //on slider move subtract form other if other > 0 and udate state of new item
      // have add category box
      //if value exceeds amount spent prompt user with error && disable save.
      //on submit,update App level state and save to local storage

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  React.useEffect(() => {

  })

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
      <div className="expense-form" >
        <form className='box-brutal' onSubmit={handleSubmit}>
          <label htmlFor="endOfDay">What's your end of day balance?</label><br />
          <input 
            type="number" 
            name="endOfDay" 
            onChange={handleChange}
            value={formData.endOfDay}
          />
        </form>  
        <br />

        <Stats stats={data[0].stats} formData={formData}  amountSpent={data[0].stats.accountBalance - formData.endOfDay}/>


        <form className='box-brutal expense-sliders-group' onSubmit={handleSubmit}>
          <h3>Enter new expense</h3>        
          <h4>How did you spend the ${daysSpend}?</h4><br />       
          <div className="form-group">          
            <label htmlFor="groceries">Groceries</label>
            <input 
              type="range"
              name="groceries"
              onChange={handleChange}
              value={formData.groceries}
              max={daysSpend}
            />
            <span className='slider-value'>{formData.groceries}</span>
          </div>

          <div className='form-group'>
            <label htmlFor="gas">Gas</label>
            <input
              type="range"
              name="gas"
              onChange={handleChange}
              value={formData.gas}
              max={daysSpend}
            />
            <span className='slider-value'>{formData.gas}</span>
          </div>

          <div className="form-group">
            <label htmlFor="food-drinks">Food & Drinks</label>
            <input
              type="range"
              name="food"
              onChange={handleChange}
              value={formData.food}
              max={daysSpend}
            />
            <span  className='slider-value'>{formData.food}</span>
          </div>
          {message}<br />
          <button className="button-brutal">Submit</button>
        </form>
      </div>
  )
}