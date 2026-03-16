import type { Component, AnchorHTMLAttributes } from 'vue'

export type NativeLinkProps = AnchorHTMLAttributes

export interface LinkProps {
  /** Describes the anchor element to assistive technologies. */
  'aria-label'?: string
  /** CSS class name. */
  class?: string
  /** Causes the browser to treat the linked URL as a download. */
  download?: NativeLinkProps['download']
  /** The URL the hyperlink points to. */
  href?: string
  /** The ID of the element. */
  id?: string
  onClick?: NativeLinkProps['onClick']
  onMouseenter?: NativeLinkProps['onMouseenter']
  onMouseleave?: NativeLinkProps['onMouseleave']
  /** How much of the referrer to send when following the link. */
  referrerPolicy?: string
  /** The relationship of the linked URL. */
  rel?: string
  /** WAI-ARIA role. */
  role?: NativeLinkProps['role']
  /** Where to display the linked URL. */
  target?: NativeLinkProps['target']
}

export interface CoreContext {
  /** The global link component used by components that render anchor elements. */
  linkComponent: Component
}

/** Injection key for the core context. */
export const CORE_CONTEXT_KEY = Symbol('agds:core') as InjectionKey<CoreContext>

// Re-export InjectionKey so consumers can import it from this module.
import type { InjectionKey } from 'vue'
export type { InjectionKey }
