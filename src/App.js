import './App.css';
import React from "react"
import Home from './components/Home'
import Form from './components/Form'
import Balance from './components/Balance'
import Dashboard from './components/Dashboard'

// import data from './data'

/// On load, check for data in local storage
  /// Local data :
    // { id: "k-QTcpy7l9ChpSghWCEfe", 
    //   username: "PeterSaver",
    //   balance: 500, 
    //   last-update: 05-06-2022,
    //   catergories: {"food", "clothes", "gas", "groceries"}    
    //   Entries: [
    //     {id: "ICT8BJG3blK8vsG2EFpYz", "startOfDay": 600, "endOfDay": "500", "amountSpent": 100, expenses: {"food": "52", "gas": "17", "groceries": "31", dateCreated: 05-06-2022}}
    //     {id: "ICT8BJG3blK8vsG2EFpYz", "startOfDay": 600, "endOfDay": "500", "amountSpent": 100, expenses: {"food": "52", "gas": "17", "groceries": "31", dateCreated: 05-06-2022}}
    //     {id: "ICT8BJG3blK8vsG2EFpYz", "startOfDay": 600, "endOfDay": "500", "amountSpent": 100, expenses: {"food": "52", "gas": "17", "groceries": "31", dateCreated: 05-06-2022}}],
    //   isCorrect: true
    // }
  /// if data, set button to keep saving
  /// display new screen, id data => stats : ask whats your current balance
  /// setNewData:
      // {
      //   {id"ICT8BJG3blK8vsG2EFpYz", "startOfDay": 500, "endOfDay": 400, amountSpent: 100}
      // }
  /// on submit take new screen, how did you spend it pass in new data:
  // update graph of daily spending with data:
  /// form recieves categories      
  // allow add category form
  // only append exspence if not 0
      // {id"ICT8BJG3blK8vsG2EFpYz", "startOfDay": 500, "endOfDay": 400, amountSpent: 100, expenses: {"food": "52", "gas": "17", "groceries": "31", dateCreated: 05-06-2022}}
  /// add up and down buttons to range

  /// on submit display summary with confirmation button. On CONFIRM ,update App level state and save to local storage
  
  /// display new screen, date balance and expense, Display bar graph with weekly expenses 

  /// allow add income form 


function App() {
  const [userData, setUserData] = React.useState(
      JSON.parse(localStorage.getItem("data")) || ''
    )
  const [appStatus, setAppStatus] = React.useState({
    isOpen: false,
    hasData: false,
    endOfDay: 100,
    startOfDay: 700,
    totals: []
  })

  React.useEffect(() => {
    if (userData !== '') {
      localStorage.setItem("data", JSON.stringify(userData))

      const data = userData
      const dataKeys = Object.keys(data)
      const totalPerCatergory = [
        {catergory: "Food", value: "0"}, 
        {catergory: "Transport", value: "0"},
        {catergory: "Entertainment", value: "0"}, 
        {catergory: "Lifestyle", value: "0"},
        {catergory: "Healthcare", value: "0"}, 
        {catergory: "Save/Invest", value: "0"},
        {catergory: "Insurance", value: "0"}, 
        {catergory: "Utilities", value: "0"},
        {catergory: "Housing", value: "0"}
      ]

      /// extract daily expenses
      dataKeys.forEach(key => {
        const day = data[key].expenses

      /// add daily expenses to each catergory
        day.forEach(item => {

            const index =  totalPerCatergory.findIndex((entry) => entry.catergory === item.catergory)
            if (index !== -1) {
              totalPerCatergory[index].value = parseInt(totalPerCatergory[index].value) + parseInt(item.value)
            } 
        })
      })

      ///Add totals to appStatus
      setAppStatus(prevStatus => {
        return {
          ...prevStatus,
          totals: totalPerCatergory
        }
      })

    } 
    console.log("localStorage UPDATED")
  }, [userData])

  function openApp(e) {
    e.preventDefault()
    setAppStatus(prevStatus => {
        return {
          ...prevStatus, 
          isOpen: true
        }
    })
  }

  function balanceUpdate(e) {
   setAppStatus(prevStatus => {
     return {
       ...prevStatus,
       endOfDay: e.target.value
     }
   })
  }

  function submitDaysData(daysData) {
    const date = Date.now()  
    
    setAppStatus(prevStatus => {
      return {
        ...prevStatus,
        startOfDay: prevStatus.endOfDay,
        isOpen: false,
        hasData: false
      }
    })

    setUserData(prevData => {
      return {
        ...prevData,
        [date]: daysData
      }
    })
   }

  function handleBalanceSubmit(e) {
    e.preventDefault()
    setAppStatus(prevStatus => {
      return {
        ...prevStatus,
        hasData: true
      }
    })
  }

  return (
    <div className="App">
      <svg className="polygon-1" xmlns="http://www.w3.org/2000/svg" width="373" height="812" viewBox="0 0 373 812" fill="none">
      <path d="M436 -176L727 620.5L0.5 814V670L167.64 567.081L436 -176Z" fill="#F155FF"/>
      </svg>
      {
      (appStatus.isOpen === true) 
      ?
        (appStatus.hasData === true)
        ?
        <Form appStatus={appStatus} submitDaysData={submitDaysData}/>
        :
        <div className='dashboard-group'>
          <Balance balanceUpdate={balanceUpdate} handleBalanceSubmit={handleBalanceSubmit} appStatus={appStatus}  />
          <Dashboard data={appStatus.totals}/>
        </div>
      :
      <Home openApp={openApp}/>
      }
      <svg className="polygon-2" xmlns="http://www.w3.org/2000/svg" width="575" height="249" viewBox="0 0 575 249" fill="none">
      <path d="M0.855663 197.17L489.356 0.170309L574.34 248.324L0.855663 197.17Z" fill="#42C0AA"/>
      </svg>
    </div>
  );
}

export default App;
