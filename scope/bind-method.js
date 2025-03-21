const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const app = (() => {
    const cars = ['BMW']
    //get element trong DOM
    const root = $('#root')
    const submit = $('#submit')
    const input = $('#input')

    return {
        add(car) {
            cars.push(car)
        },
        delete(index) {
            cars.splice(index,1)
        },
        render() {
            const html = cars.map((car,index) => 
                `<li>
                    ${car}
                    <span class="delete" data-index="${index}">&times</span>
                </li>` 
            )
            .join('')
            root.innerHTML = html
        },
        handleDelete(e) {
            //.closest get vi tri gan nhat cua nut delete
            const deleteBtn = e.target.closest('.delete')
            if (deleteBtn) {
                const index = deleteBtn.dataset.index
                this.delete(index)
                this.render()
            }
        },
        init() {
            //Handle DOM events
            submit.onclick = () => {
                const car = input.value
                this.add(car) 
                /* khi gan submit.onclick = function()
                context cua this luc nay la submit, ko phai app
                cach fix la gan = arrow function
                */
                this.render()
                input.value = null
                input.focus()
            }

            root.onclick = this.handleDelete.bind(this)
            /* khi gan root.onclick = this.handleDelete
            context cua this luc nay la root, ko phai app
            cach fix la them bind
            */
            this.render()
        }
    }
})();

app.init()
