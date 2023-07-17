// import React, { useState } from 'react';
// import './QuestionForm.css';


// function QuestionForm() {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       type: 'normal',
//       question: 'Before we start can we start with your name?',
//       answer: '',
//       mandatory: true,
//       category: 'A BIT ABOUT YOU',
//     },
   
//     {
//       id: 2,
//       type: 'radio',
//       question: 'Gender',
//       options: ['Male', 'Female'],
//       selectedOption: '',
//       mandatory: true,
//       category: 'A BIT ABOUT YOU',
//     },
//     {
//         id: 3,
//         type: 'radio',
//         question: 'What does your hair looks like naturally?',
//         options: ['Stright', 'Wavy','curly','coily'],
//         selectedOption: '',
//         mandatory: true,
//         category: 'KNOW YOUR HAIR',
//       },
//       {
//         id: 4,
//         type: 'radio',
//         question: 'Discribe your hair Quality',
//         options: ['Good Hair Quality','Damaged Hair'],
//         selectedOption: '',
//         mandatory: true,
//         category: 'KNOW YOUR HAIR',
//       },
//       {
//         id: 5,
//         type: 'multi',
//         question: 'Have you ever experienced any of the below in last 1 year?',
//         options: ['None', 'Severe Illness(Dengue,Malaria,typhoid or covid)', 'Heavy weight loss or weight gain','Surgery or on heavy medication'],
//         selectedOptions: [],
//         mandatory: true,
//         category: 'YOUR LIFESTYLE',
//       },
//       {
//         id: 6,
//         type: 'multi',
//         question: 'Are you going through any of the below ?',
//         options: ['Anemia', 'Low Thyroid', 'PCOS','Other hormonal issue','None'],
//         selectedOptions: [],
//         mandatory: true,
//         category: 'YOUR LIFESTYLE',
//       },
//     {
//       id: 7,
//       type: 'image',
//       question: 'Our doctors need a photo of your scalp',
//       image: null,
//       mandatory: true,
//       category: 'SCALP ASSESSMENT',
//     },
//   ]);

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [responses, setResponses] = useState([]);
//   const [name, setName] = useState('');
//   const [showMessage, setShowMessage] = useState(false);

//   const handleNextQuestion = () => {
//     const currentAnswer = questions[currentQuestion].type === 'normal'
//       ? name
//       : questions[currentQuestion].type === 'multi'
//         ? questions[currentQuestion].selectedOptions
//         : questions[currentQuestion].type === 'radio'
//           ? questions[currentQuestion].selectedOption
//           : questions[currentQuestion].image;

//     if (!currentAnswer) {
//       alert('Please provide an answer for the current question.');
//       return;
//     }

//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     } else {
//       setShowMessage(true);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prevQuestion) => prevQuestion - 1);
//     }
//   };

//   const handleResponseChange = (event) => {
//     const { value, type, name, checked } = event.target;

//     if (type === 'text' || type === 'textarea') {
//       if (currentQuestion === 0) {
//         setName(value);
//       } else {
//         setQuestions((prevQuestions) =>
//           prevQuestions.map((question) =>
//             question.id === currentQuestion + 1
//               ? { ...question, answer: value }
//               : question
//           )
//         );
//       }
//     }
//     else if (type === 'checkbox') {
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((question) =>
//           question.id === currentQuestion + 1
//             ? {
//                 ...question,
//                 selectedOptions: checked
//                   ? [...question.selectedOptions, value]
//                   : question.selectedOptions.filter((opt) => opt !== value),
//               }
//             : question
//         )
//       );
//     } else if (type === 'radio') {
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((question) =>
//           question.id === currentQuestion + 1
//             ? { ...question, selectedOption: value }
//             : question
//         )
//       );
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((question) =>
//           question.id === currentQuestion + 1
//             ? { ...question, image: URL.createObjectURL(file) }
//             : question
//         )
//       );
//     }
//   };

//   const handleSubmit = () => {
//     for (const question of questions) {
//       const currentAnswer = question.type === 'normal'
//         ? name
//         : question.type === 'multi'
//           ? question.selectedOptions
//           : question.type === 'radio'
//             ? question.selectedOption
//             : question.image;

//       if (!currentAnswer) {
//         alert('Please provide an answer for all the questions.');
//         return;
//       }
//     }

//     const outputMessage = `Hi ${name},

// Thank you for taking the hair test. Based on your responses, we have identified the top reasons behind your hairfall.

// We can only imagine how frustrating it must have been to deal with hairfall.

// But, we are pretty confident that we can fix this together.

// Let's get started!`;

//     setResponses([...responses, outputMessage]);
//     setShowMessage(true);
//   };

//   const isAnswerProvided = () => {
//     const currentQuestionType = questions[currentQuestion].type;

    
//     if (currentQuestionType === 'normal') {
//         if (currentQuestion === 0) {
//           return name !== '';
//         } 
//       }
//     if (currentQuestionType === 'multi') {
//       return questions[currentQuestion].selectedOptions.length > 0;
//     }

//     if (currentQuestionType === 'radio') {
//       return questions[currentQuestion].selectedOption !== '';
//     }

//     if (currentQuestionType === 'image') {
//       return questions[currentQuestion].image !== null;
//     }

//     return false;
//   };

//   const handleExit = () => {
//     window.location.href = 'https://traya.health/';
//   };

//   return (
//     <div>
//       {!showMessage && (
//         <div>
//           {currentQuestion < questions.length ? (
//             <div className="question-container">
//               <h3 className="question-category">{questions[currentQuestion].category}</h3>
//               <h3 className="question-title">{questions[currentQuestion].question}</h3>
//               <div className="question-content">
//                 {currentQuestion === 0 ? (
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={handleResponseChange}
//                     placeholder="Your Name"
//                 //    value style='position: relative;
//                 //     bottom: -66px;
//                 //     height: 42px;
//                 //     left: 18px;'
//                 // style={{textDecoration: 'underline',                    
//                 //     position: 'relative',
//                 //     bottom: '-30px',
//                 //     border: 'aliceblue',height: '45px'}}
//                   />
                  
//                 ) : questions[currentQuestion].type === 'normal' ? (
//                     <div>
//                       {questions[currentQuestion].options.map((option, index) => (
//                         <div key={index}>
//                           <label>
//                             <input
//                               type="radio"
//                               name="radio-question"
//                               value={option}
//                               checked={
//                                 questions[currentQuestion].selectedOption === option
//                               }
//                               onChange={handleResponseChange}
//                             />{' '}
//                             {option}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   )
//                 : questions[currentQuestion].type === 'multi' ? (
//                   <div>
//                     {questions[currentQuestion].options.map((option, index) => (
//                       <div key={index}>
//                         <label>
//                           <input
//                             type="checkbox"
//                             name={`option-${index}`}
//                             value={option}
//                             checked={questions[currentQuestion].selectedOptions.includes(
//                               option
//                             )}
//                             onChange={handleResponseChange}
//                           />{' '}
//                           {option}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 ) : questions[currentQuestion].type === 'radio' ? (
//                   <div>
//                     {questions[currentQuestion].options.map((option, index) => (
//                       <div key={index}>
//                         <label>
//                           <input
//                             type="radio"
//                             name="radio-question"
//                             value={option}
//                             checked={
//                               questions[currentQuestion].selectedOption === option
//                             }
//                             onChange={handleResponseChange}
//                           />{' '}
//                           {option}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 ) : questions[currentQuestion].type === 'image' ? (
//                   <div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                     //  style={" position: relative;
//                     //   top: -119px"
//                     //   style={{position:'relative',top:'-88px'}}
//                     //   onChange={handleImageUpload}
//                     />
//                     {questions[currentQuestion].image && (
//                       <img
//                         src={questions[currentQuestion].image}
//                         alt="Uploaded"
//                         className="uploaded-image"
//                       />
//                     )}
//                   </div>
//                 ) : null}
//               </div>
//               <div className="question-navigation">
//                 {currentQuestion > 0 && (
//                   <button
//                     type="button"
//                     className="previous-button"
//                     onClick={handlePreviousQuestion}
//                   >
//                     Previous
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className={`next-button ${isAnswerProvided() ? 'enabled' : ''}`}
//                   onClick={handleNextQuestion}
//                   disabled={!isAnswerProvided()}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="message-container">
//               <h3 className="message-title">Thank You!</h3>
//               <p className="message-text">
//                 Hi {name},<br />
//                 Thank you for taking the hair test. Based on your responses, we have identified the top reasons behind your hairfall.<br />
//                 We can only imagine how frustrating it must have been to deal with hairfall.<br />
//                 But, we are pretty confident that we can fix this together.<br />
//                 Let's get started!
//               </p>
//               <h4 className="responses-title">Responses:</h4>
//               {responses.map((response, index) => (
//                 <div key={index} className="response">
//                   <p>{response}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//           <button
//             type="button"
//             className="exit-button"
//             onClick={handleExit}
//           >
//             Exit
//           </button>
//         </div>
//       )}
//       {showMessage && (
//         <div className="message-container">
//           <h3 className="message-title">Thank You!</h3>
//           <p className="message-text">
//             Hi {name},<br />
//             Thank you for taking the hair test. Based on your responses, we have identified the top reasons behind your hairfall.<br />
//             We can only imagine how frustrating it must have been to deal with hairfall.<br />
//             But, we are pretty confident that we can fix this together.<br />
//             Let's get started!
//           </p>
//           <h4 className="responses-title">Responses:</h4>
//           {responses.map((response, index) => (
//             <div key={index} className="response">
//               <p>{response}</p>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="exit-button"
//             onClick={handleExit}
//           >
//             Exit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionForm;
import React, { useState } from 'react';
import './QuestionForm.css';

function QuestionForm() {
  const [questions, setQuestions] = useState([
    {
              id: 1,
              type: 'normal',
              question: 'Before we start can we start with your name?',
              answer: '',
              mandatory: true,
              category: 'A BIT ABOUT YOU',
            },
           
            {
              id: 2,
              type: 'radio',
              question: 'Gender',
              options: ['Male', 'Female'],
              selectedOption: '',
              mandatory: true,
              category: 'A BIT ABOUT YOU',
            },
            {
                id: 3,
                type: 'radio',
                question: 'What does your hair looks like naturally?',
                options: ['Stright', 'Wavy','curly','coily'],
                selectedOption: '',
                mandatory: true,
                category: 'KNOW YOUR HAIR',
              },
              {
                id: 4,
                type: 'radio',
                question: 'Discribe your hair Quality',
                options: ['Good Hair Quality','Damaged Hair'],
                selectedOption: '',
                mandatory: true,
                category: 'KNOW YOUR HAIR',
              },
              {
                id: 5,
                type: 'multi',
                question: 'Have you ever experienced any of the below in last 1 year?',
                options: ['None', 'Severe Illness(Dengue,Malaria,typhoid or covid)', 'Heavy weight loss or weight gain','Surgery or on heavy medication'],
                selectedOptions: [],
                mandatory: true,
                category: 'YOUR LIFESTYLE',
              },
              {
                id: 6,
                type: 'multi',
                question: 'Are you going through any of the below ?',
                options: ['Anemia', 'Low Thyroid', 'PCOS','Other hormonal issue','None'],
                selectedOptions: [],
                mandatory: true,
                category: 'YOUR LIFESTYLE',
              },
            {
              id: 7,
              type: 'image',
              question: 'Our doctors need a photo of your scalp',
              image: null,
              mandatory: true,
              category: 'SCALP ASSESSMENT',
            },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [name, setName] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleNextQuestion = () => {
    const currentAnswer = questions[currentQuestion].type === 'normal'
      ? name
      : questions[currentQuestion].type === 'multi'
        ? questions[currentQuestion].selectedOptions
        : questions[currentQuestion].type === 'radio'
          ? questions[currentQuestion].selectedOption
          : questions[currentQuestion].image;

    if (!currentAnswer) {
      alert('Please provide an answer for the current question.');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setShowMessage(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleResponseChange = (event) => {
    const { value, type, name, checked } = event.target;

    if (type === 'text' || type === 'textarea') {
      if (currentQuestion === 0) {
        setName(value);
      } else {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === currentQuestion + 1
              ? { ...question, answer: value }
              : question
          )
        );
      }
    } else if (type === 'checkbox') {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === currentQuestion + 1
            ? {
                ...question,
                selectedOptions: checked
                  ? [...question.selectedOptions, value]
                  : question.selectedOptions.filter((opt) => opt !== value),
              }
            : question
        )
      );
    } else if (type === 'radio') {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === currentQuestion + 1
            ? { ...question, selectedOption: value }
            : question
        )
      );
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === currentQuestion + 1
            ? { ...question, image: URL.createObjectURL(file) }
            : question
        )
      );
    }
  };

  const handleSubmit = () => {
    for (const question of questions) {
      const currentAnswer = question.type === 'normal'
        ? name
        : question.type === 'multi'
          ? question.selectedOptions
          : question.type === 'radio'
            ? question.selectedOption
            : question.image;

      if (!currentAnswer) {
        alert('Please provide an answer for all the questions.');
        return;
      }
    }

    const outputMessage = `Hi ${name},

Thank you for taking the hair test. Based on your responses, we have identified the top reasons behind your hairfall.

We can only imagine how frustrating it must have been to deal with hairfall.

But, we are pretty confident that we can fix this together.

Let's get started!`;

    setResponses([...responses, outputMessage]);
    setShowMessage(true);
  };

  const isAnswerProvided = () => {
    const currentQuestionType = questions[currentQuestion].type;

    if (currentQuestionType === 'normal') {
      return name !== '';
    }

    if (currentQuestionType === 'multi') {
      return questions[currentQuestion].selectedOptions.length > 0;
    }

    if (currentQuestionType === 'radio') {
      return questions[currentQuestion].selectedOption !== '';
    }

    if (currentQuestionType === 'image') {
      return questions[currentQuestion].image !== null;
    }

    return false;
  };

  const handleExit = () => {
    window.location.href = 'https://traya.health/';
  };

  return (
    <div>
      {!showMessage && (
        <div>
          {currentQuestion < questions.length ? (
            <div className="question-container">
              <h3 className="question-category">{questions[currentQuestion].category}</h3>
              <h3 className="question-title">{questions[currentQuestion].question}</h3>
              <div className="question-content">
                {currentQuestion === 0 ? (
                  <input
                    type="text"
                    value={name}
                    onChange={handleResponseChange}
                    placeholder="Your Name"
                    style={{textDecoration: 'underline',                    
                    position: 'relative',
                    bottom: '-30px',
                    border: 'aliceblue',height: '45px'}}
                  />
                ) : questions[currentQuestion].type === 'multi' ? (
                  <div>
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="checkbox"
                            name={`option-${index}`}
                            value={option}
                            checked={questions[currentQuestion].selectedOptions.includes(
                              option
                            )}
                            onChange={handleResponseChange}
                          />{' '}
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : questions[currentQuestion].type === 'radio' ? (
                  <div>
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="radio"
                            name="radio-question"
                            value={option}
                            checked={
                              questions[currentQuestion].selectedOption === option
                            }
                            onChange={handleResponseChange}
                          />{' '}
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : questions[currentQuestion].type === 'image' ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{position:'relative',top:'-10px'}}
                      onChange={handleImageUpload}
                    />
                    {questions[currentQuestion].image && (
                      <img
                        src={questions[currentQuestion].image}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    )}
                  </div>
                ) : null}
              </div>
              <div className="question-navigation">
                {currentQuestion > 0 && (
                  <button
                    type="button"
                    className="previous-button"
                    onClick={handlePreviousQuestion}
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  className={`next-button ${isAnswerProvided() ? 'enabled' : ''}`}
                  onClick={handleNextQuestion}
                  disabled={!isAnswerProvided()}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="message-container">
              <h3 className="message-title">Thank You!</h3>
              <p className="message-text">
                Hi {name},<br />
                Thank you for taking the hair test. Based on your responses, we have identified the top reasons behind your hairfall.<br />
                We can only imagine how frustrating it must have been to deal with hairfall.<br />
                But, we are pretty confident that we can fix this together.<br />
                Let's get started!
              </p>
              <h4 className="responses-title">Responses:</h4>
              {responses.map((response, index) => (
                <div key={index} className="response">
                  <p>{response}</p>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            className="exit-button"
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
      )}
      {showMessage && (
        <div className="message-container">
          <h3 className="message-title">Thank You!</h3>
          <p className="message-text">
            Hi {name},<br />
            Thank you for taking the hair test. Based on your responses, we have identified the top reasons behind your hairfall.<br />
            We can only imagine how frustrating it must have been to deal with hairfall.<br />
            But, we are pretty confident that we can fix this together.<br />
            Let's get started!
          </p>
          <h4 className="responses-title"></h4>
          {responses.map((response, index) => (
            <div key={index} className="response">
              <p>{response}</p>
            </div>
          ))}
          <button
            type="button"
            className="exit-button"
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionForm;
