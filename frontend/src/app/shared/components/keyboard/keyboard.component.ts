import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-pro-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html'
})
export class KeyboardComponent {
  @Output() newItemEvent = new EventEmitter<string>()

  letters = 'ABCEFGHJKLMNOPRSTVXZ'
  values = ['C-01', 'C-03', 'C-05', 'C-09', 'C-11', 'L-01', 'L-03', 'L-05', 'P-01', 'Z-01', 'Z-03', 'Z-07', 'Z-09']
  input = ''
  activeLetters: Set<string>
  alternatives: string[]

  constructor() {
    this.activeLetters = this.calculateActiveLetters()
    this.alternatives = []
  }

  @HostListener('document:keydown', ['$event'])
  handleKeypressEvent(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      if (this.input.length === 2) {
        this.input = ''
      } else {
        this.input = this.input.slice(0, -1)
      }
    }

    const inputKey = event.key.toUpperCase()

    if (this.input.length === 0 && this.letters.includes(inputKey)) {
      this.handleClickLetter(inputKey)
      return
    }

    if (this.values.some(value => value.startsWith(this.input + inputKey))) {
      this.input += inputKey
    }

    if (this.values.includes(this.input)) {
      this.newItemEvent.emit(this.input)
      this.reset()
    }
  }

  handleClickLetter(letter: string) {
    if (this.input.length === 0) {
      this.input = letter + '-'
      this.alternatives = this.calculateAlternatives()
    }
  }

  handleClickAlternative(alt: string) {
    if (this.values.includes(alt)) {
      this.newItemEvent.emit(alt)
      this.reset()
    }
  }

  handleReset() {
    this.reset()
  }

  reset() {
    this.input = ''
    this.alternatives = []
  }

  calculateActiveLetters() {
    const letters = new Set<string>()

    for (let value of this.values) {
      letters.add(value[0])
    }

    return letters
  }

  calculateAlternatives() {
    const alternatives: string[] = []
    for (let value of this.values) {
      if (value.startsWith(this.input)) {
        alternatives.push(value)
      }
    }

    return alternatives;
  }
}
