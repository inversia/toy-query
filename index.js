// Реализация некоторых методов


// "jQuery"

function getNodes (from) { // должно возвращать список Nodes
  
   if (Node.prototype.isPrototypeOf (from)) { // если нам передали Node
     
     return [from]
     
   } else if (from[0] === '<') { // либо создаем их из переданной HTML-строки
     
     const root = document.createElement ('DIV')
     root.innerHTML = query  // стирает все, что в root и добавляет содержимое, пробразовывая в DOM-дерево
     return root.childNodes
          
   } else { // либо находим их в DOM
     
     return document.querySelectorAll (from)
   }
}

function $(from) {
  
   const nodes = [...getNodes (from)]
  
/* "JQuery collection"   */
  
   return {
     
      length: nodes.length,
     
      ...nodes,
     
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
        
      html (smth) {
         if (smth !== undefined) {
            for (const el of nodes) el.innerHTML = smth
            return this
         } else {
            let result = ''
            for (const el of nodes) result += el.innerHTML
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
      },
     
     attr (name, value){
        if (value === undefined){
          
          return nodes[0].getAttribute(name)
        } else {
          
          for (const el of nodes) el.setAttribute (name, value)
          return this
        }
     },
     
     removeAttr (name) {
        for (const el of nodes) el.removeAttribute (name)
     },
       
     each (callback) {
        for (let i = 0; i < nodes.length; i++) callback(i, nodes[i])
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