// Реализация некоторых методов


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


// Реализация функции querySelector



function isElementMatches (node, token) {
    
    if (token[0] === '#') { // токен является id

        return (node.id === token.slice(1))

    } else /* токен является тегом */ {
        return (node.tagName === token.toUpperCase ())
    }
}



function _querySelector (root, [token, ...restTokens]) {

    if (!token) return root

    for (const node of root.childNodes) {

        if (isElementMatches(node, token)) {

            const result = _querySelector (node, restTokens)
            
            if (result) return result
        }
    }

    // nothing found
    return undefined
}

function querySelector (root, selector) {

    return _querySelector (root, selector.split (' > '))
}

document.addEventListener ('DOMContentLoaded', () => {

    // console.log ('querySelector returned:', querySelector (document.body, 'div > #ololo > li > strong'))
})