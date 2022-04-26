const people = [
  {name: 'Taro', age: 16},
  {name: 'Jiro', age: 20},
  {name: 'Hanko', age: 19},
  {name: 'Yuko', age: 31},
  {name: 'Toshihiro', age: 26},
  {name: 'Takuma', age: 16},
  {name: 'Sino', age: 16},
  {name: 'Kazuhisa', age: 50},
  {name: 'Tomoko', age: 43},
  {name: 'Kazuma', age: 10},
]

// 古いやり方
console.log('古いやり方')
var over20 = []
// フィルタリング
for (let i = 0; i < people.length; i++) {
  if (people[i].age >= 20) {
    over20.push(people[i])
  }
}
// ソート
for (let i = 0; i < over20.length - 1; i++) {
  for (let j = over20.length - 1; i < j; j--) {
    if (over20[j].age < over20[j - 1].age) {
      let tmp = over20[j - 1]
      over20[j - 1] = over20[j]
      over20[j] = tmp
    }
  }
}
// 出力
for (let i = 0; i < over20.length; i++) {
  console.log(`name=${over20[i].name}, age=${over20[i].age}`)
}

// モダンなやり方
console.log('モダンなやり方')
people
  .filter(p => p.age >= 20)
  .sort((a, b) => a.age - b.age)
  .forEach(p => console.log(`name=${p.name}, age=${p.age}`))
