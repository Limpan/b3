import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Row } from '../../../core/models/row.model';

function createMachine(stateMachineDefinition: any) {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition(currentState: string, event: string) {
      const currentStateDefinition = stateMachineDefinition[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]
      if (!destinationTransition) {
        return
      }
      const destinationState = destinationTransition.target
      const destinationStateDefinition = stateMachineDefinition[destinationState]
      
      destinationTransition.action();
      currentStateDefinition.actions.onExit();
      destinationStateDefinition.actions.onEnter();

      machine.value = destinationState

      return machine.value
    }
  }

  return machine
}


@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html'
})
export class KeyboardComponent {
  @Output() newItemEvent = new EventEmitter<Row>()

  letters = 'ABCEFGHJKLMNOPRSTVXZ'
  values = ['C-01', 'C-03', 'C-05', 'C-09', 'C-11', 'L-01', 'L-03', 'L-05', 'P-01', 'Z-01', 'Z-03', 'Z-07', 'Z-09']
  input = ''
  amount = ''
  activeLetters: Set<string>
  alternatives: string[] = []
  amountSuggestValues = [20, 10, 30, 15, 40, 25, 50, 5, 100, 60, 80, 35, 150, 75, 70, 200].sort((a, b) => b - a)

  machine
  state

  constructor() {
    this.activeLetters = this.calculateActiveLetters()

    this.machine = createMachine({
      initialState: 'letter',
      letter: {
        actions: {
          onExit: () => {
            console.log('"onExit" for "letter" state');
          },
          onEnter: () => {
            console.log('"onEnter" for "letter" state');
            this.input = '';
            this.amount = '';
          },
        },
        transitions: {
          add: {
            target: 'number',
            action: () => {
              console.log('transition action for "add" in "letter" state')
              this.alternatives = this.calculateAlternatives();
            }
          }
        }
      },
      number: {
        actions: {
          onExit: () => {
            console.log('"onExit" for "number" state');
          },
          onEnter: () => {
            console.log('"onEnter" for "number" state');
            this.calculateAlternatives()
          },
        },
        transitions: {
          add: {
            target: 'amount',
            action: () => {
              console.log('transition action for "add" in "number" state')
            }
          },
          clear: {
            target: 'letter',
            action: () => {
              console.log('transition action for "clear" in "number" state')
            }
          }
        }
      },
      amount: {
        actions: {
          onExit: () => {
            console.log('"onExit" for "amount" state');
          },
          onEnter: () => {
            console.log('"onEnter" for "amount" state')
          },
        },
        transitions: {
          switch: {
            target: 'pad',
            action() {
              console.log('transition action for "switch" in "amount" state')
            }
          },
          enter: {
            target: 'letter',
            action() {
              console.log('transition action for "enter" in "amount" state')
            }
          },
          clear: {
            target: 'letter',
            action() {
              console.log('transition action for "clear" in "amount" state')
            }
          }
        }
      },
      pad: {
        actions: {
          onExit: () => {
            console.log('"onExit" for "pad" state');
          },
          onEnter: () => {
            console.log('"onEnter" for "pad" state')
          },
        },
        transitions: {
          switch: {
            target: 'amount',
            action() {
              console.log('transition action for "switch" in "pad" state')
            }
          },
          enter: {
            target: 'letter',
            action() {
              console.log('transition action for "enter" in "pad" state')
            }
          },
          clear: {
            target: 'letter',
            action() {
              console.log('transition action for "clear" in "pad" state')
            }
          }
        }
      }
    })
    this.state = this.machine.value
  }

  @HostListener('document:keydown', ['$event'])
  handleKeypressEvent(event: KeyboardEvent) {
    switch (this.state) {
      case 'letter':
        if (this.letters.includes(event.key.toUpperCase())) {
          this.handleClickLetter(event.key.toUpperCase())
        }
        break
      case 'number':
        if (this.values.some(value => value.startsWith(this.input + event.key))) {
          this.input += event.key
        }
        
        if (this.values.includes(this.input)) {
          this.state = this.machine.transition(this.state, 'add')
        }

        if (event.key === 'Backspace') {
          if (this.input.length === 2) {
            this.input = ''
            this.state = this.machine.transition(this.state, 'clear')
          } else {
            this.input = this.input.slice(0, -1)
          }
        }
        break
      case 'amount':
      case 'pad':
        if (event.key === 'Backspace') {
          if (this.amount.length === 0) {
            this.input = ''
            this.state = this.machine.transition(this.state, 'clear')
          } else {
            this.amount = this.amount.slice(0, -1)
          }
        } else if (event.key === 'Enter') {
          this.newItemEvent.emit({seller: this.input, amount: parseInt(this.amount)})
          this.state = this.machine.transition(this.state, 'enter')
        } else if ('0123456789'.includes(event.key)) {
          console.log({key: event.key})
          this.amount += event.key
        }

        break
    }
  }

  handleClickLetter(letter: string) {
    if (this.state === 'letter') {
      if (this.values.some(value => value[0] === letter)) {
        this.input = letter + '-'
        this.state = this.machine.transition(this.state, 'add');
      }
    }
  }

  handleClickAlternative(alt: string) {
    if (this.values.includes(alt)) {
      this.input = alt
      this.state = this.machine.transition(this.state, 'add')
    }
  }

  handleClickAmountAlternative(alt: string) {
    this.newItemEvent.emit({seller: this.input, amount: parseInt(alt)})
    this.state = this.machine.transition(this.state, 'enter')
  }

  handleClickNumber(num: number) {
    this.amount += num
  }

  handleSwitch() {
    this.state = this.machine.transition(this.state, 'switch')
  }

  handleClickEnter() {
    this.newItemEvent.emit({seller: this.input, amount: parseInt(this.amount)})
    this.state = this.machine.transition(this.state, 'enter')
  }

  handleClickErase() {
    if (this.amount.length > 0) {
      this.amount = this.amount.slice(0, -1)
    }
  }

  handleReset() {
    this.state = this.machine.transition(this.state, 'clear')
  }

  reset() {
    this.input = ''
    this.alternatives = []
  }

  calculateActiveLetters() {
    const letters = new Set<string>()

    for (const value of this.values) {
      letters.add(value[0])
    }

    return letters
  }

  calculateAlternatives() {
    const alternatives: string[] = []
    for (const value of this.values) {
      if (value.startsWith(this.input)) {
        alternatives.push(value)
      }
    }

    return alternatives;
  }
}
