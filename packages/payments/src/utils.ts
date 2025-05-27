export function formatDate (date:Date){
  return new Intl.DateTimeFormat("en-US",{
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date)
}

export function formatAmount (amount:number, currency:string){
  return new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency
  }).format(amount/100)
}