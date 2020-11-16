Cypress.Commands.add('$getFormItemInput', (label, el = 'input') =>
  cy
    .contains('.el-form-item .el-form-item__label', label)
    .parents('.el-form-item')
    .find(el),
)

Cypress.Commands.add(
  '$getDialogFormItemInput',
  (dialogSelector, label, el = 'input') =>
    cy.contains(`${dialogSelector} .el-form-item`, label).find(el),
)

Cypress.Commands.add(
  '$dialogSelectOption',
  (dialogSelector, selectLabel, option) => {
    cy.get(dialogSelector).within(() => {
      // 点击 dialog 下面的某个选择下拉框
      cy.$getFormItemInput(selectLabel, '.el-select').click()
    })

    cy.$select(option)
  },
)

Cypress.Commands.add(
  '$select',
  {
    prevSubject: 'optional',
  },
  (subject, {index = 0, contains = ''}) => {
    if (subject) {
      cy.get(subject).click()
    }

    // 选择某个选项
    const option = '.el-select-dropdown:visible .el-select-dropdown__item'
    if (contains) {
      cy.get(option).contains(contains).click()
    } else {
      cy.get(option).eq(index).click()
    }
  },
)
