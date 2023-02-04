import React from 'react'
import  './assets/stylesheet/suspence.less'



const Suspence = () => {

    const style = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }


    return (
        <div className='suspence-container' style={{ ...style, minHeight: '99vh', }}>
            <div id="loader" style={{ ...style, width: 900, boxShadow: '#ccc 1px 2px 33px 0px', borderRadius: 10, padding: '10px 20px', fontFamily: 'arial' }}>

                <h2>Please wait . . .</h2>
                <h1>While we load the page</h1>
                <div id="animated-css">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>

        </div>
    )
}

export default Suspence