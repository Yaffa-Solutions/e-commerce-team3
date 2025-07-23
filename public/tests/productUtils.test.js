
const { createCells, createButton, searchByProductName, renderSelect } = require('../pureFunctions.js');


// describe('Test  functions', () => {
//   test('createCells creates td with text and class', () => {
//     const td = createCells('Test Cell', 'my-class');
//     expect(td.tagName).toBe('TD');
//     expect(td.textContent).toBe('Test Cell');
//     expect(td.className).toBe('my-class');
//   });

//   test('createButton creates button with text and data-id', () => {
//     const btn = createButton('Edit', 'btn-class', 123);
//     expect(btn.tagName).toBe('BUTTON');
//     expect(btn.textContent).toBe('Edit');
//     expect(btn.className).toBe('btn-class');
//     expect(btn.getAttribute('data-id')).toBe('123');
//   });
// });

describe('searchByProductName', () => {
  const products = [
    { ProductName: 'Phone' },
    { ProductName: 'Laptop' },
    { ProductName: 'Phone Case' }
  ];

  test('filters products by name', () => {
    const result = searchByProductName(products, 'phone');
    expect(result.length).toBe(2);
    expect(result).toEqual([
      { ProductName: 'Phone' },
      { ProductName: 'Phone Case' }
    ]);
  });

  test('returns empty array if no match', () => {
    const result = searchByProductName(products, 'camera');
    expect(result).toEqual([]);
  });
});

// describe('renderSelect', () => {
//   test('adds option elements to select', () => {
//     const selectElem = document.createElement('select');
//     const categories = [
//       { categoryId: 1, categoryName: 'Electronics' },
//       { categoryId: 2, categoryName: 'Books' },
//     ];

//     renderSelect(categories, selectElem);

//     expect(selectElem.children.length).toBe(2);
//     expect(selectElem.children[0].tagName).toBe('OPTION');
//     expect(selectElem.children[0].textContent).toBe('Electronics');
//     expect(selectElem.children[0].getAttribute('data-id')).toBe('1');
//   });
// });
