import * as express from 'express'
const axios = require('axios');

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
        //res.json({result: 'test'})
        axios.get('https://www.iwillfearnoevil.com/screen/string.txt').then(response => {
            const data: Array<string> =response.data.split('\n')
            const newdata: Array<number> = this.getThreeLowIntegers(data);
            res.json({result: newdata});
            
        })
    })
    this.express.use('/', router)
  }

  private getThreeLowIntegers(input: string[]): number[] {
      const result: Array<number> =[];
      const set: Set<number> = new Set();
      input.forEach(n => {
          const num = parseInt(n);
          if(num !==NaN && !set.has(num)){
            set.add(num);
            if(result.length<3){
                result.push(num)
                
            }else{
              const maxN = Math.max.apply(Math, result)
              if(num <maxN ){
                for(let i=0;i<result.length;i++){
                    if(result[i]===maxN){
                        result[i]=num;
                    }
                  }
              }
              
            }
          }
      })
      return result;
  }
}

export default new App().express