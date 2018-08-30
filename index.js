function $(query) {
  
   let nodes // NodeList
   
   if (query[0] !== '<') { // либо находим элементы в DOM
     
     nodes = [...document.querySelectorAll (query)]
     
   } else { // либо создаем их из HTML-строки (query)
     
     const root = document.createElement ('DIV')
     root.innerHTML = query  // стирает все, что в root и добавляет содержимое, пробразовывая в DOM-дерево
     nodes = [...root.childNodes]
   }

   return {
     
      addClass (cls) {
         for (const el of nodes) el.classList.add (cls)
         return this
      },
     
      text (txt) {
         if (txt !== undefined) {
            for (const el of nodes) el.innerText = txt
            return this
         } else {
            let result = ''
            for (const el of nodes) result += el.innerText
            return result
         }
      },
     
      appendTo (container) {
        for (const el of nodes) container.appendChild (el)
        return this
      },
     
      remove (selector) {
        for (const el of nodes) el.remove ()
        return this
      },
      
      click (f) {
        
        for (const el of nodes) addEventListener ('click', f)
        return this
      }
   }
}