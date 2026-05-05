import pluginVue from 'eslint-plugin-vue'
import vueA11y from 'eslint-plugin-vuejs-accessibility'
import tsParser from '@typescript-eslint/parser'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...vueA11y.configs['flat/recommended'],
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      // --- Intentional delegation / design-system wrapper patterns ---
      // Wrapper divs pass click/key through to inner interactive children;
      // consumer is responsible for supplying focusable content.
      'vuejs-accessibility/click-events-have-key-events': 'warn',
      'vuejs-accessibility/no-static-element-interactions': 'warn',
      'vuejs-accessibility/interactive-supports-focus': 'warn',
      'vuejs-accessibility/mouse-events-have-key-events': 'warn',

      // --- False positives from Vue dynamic bindings ---
      // rule does not understand Vue `:for` dynamic attribute bindings —
      // all uses are correct; the associated control is always present.
      'vuejs-accessibility/label-has-for': 'warn',
      // rule cannot see labels supplied via slot-props from AGDSField wrapper;
      // label association is handled by the parent field component.
      'vuejs-accessibility/form-control-has-label': 'warn',

      // --- Intentional redundant roles (Safari accessibility workaround) ---
      // list-style:none removes the implicit list role in VoiceOver on Safari;
      // role="list" restores it intentionally across the design system.
      'vuejs-accessibility/no-redundant-roles': 'warn',

      // --- Design-system opt-in prop ---
      // autoFocus is exposed as an explicit opt-in prop; consumers accept the
      // responsibility. Demoted so the design system isn't blocked, while still
      // surfacing the concern on new additions.
      'vuejs-accessibility/no-autofocus': 'warn',
    },
  },
]
