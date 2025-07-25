import {Component} from '@angular/core';
import { FlameGraphConfig, NgxFlamegraphModule } from 'ngx-flamegraph';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NgxFlamegraphModule]
})
export class AppComponent {
  config = { data } as FlameGraphConfig;
}

const data = [
  {
    children: [
      {
        label: 'genunix`syscall_mstate',
        value: 89
      },
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        label: 'unix`page_lookup_create',
                                        value: 1
                                      }
                                    ],
                                    label: 'unix`page_lookup',
                                    value: 1
                                  }
                                ],
                                label: 'ufs`ufs_getpage',
                                value: 1
                              }
                            ],
                            label: 'genunix`fop_getpage',
                            value: 1
                          },
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            children: [
                                              {
                                                label: 'genunix`pvn_plist_init',
                                                value: 1
                                              },
                                              {
                                                label: 'unix`lgrp_mem_choose',
                                                value: 1
                                              },
                                              {
                                                children: [
                                                  {
                                                    children: [
                                                      {
                                                        children: [
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 1
                                                          }
                                                        ],
                                                        label: 'unix`page_get_mnode_freelist',
                                                        value: 1
                                                      }
                                                    ],
                                                    label: 'unix`page_get_freelist',
                                                    value: 1
                                                  }
                                                ],
                                                label: 'unix`page_create_va',
                                                value: 1
                                              },
                                              {
                                                children: [
                                                  {
                                                    label: 'unix`page_lookup_create',
                                                    value: 1
                                                  }
                                                ],
                                                label: 'unix`page_lookup',
                                                value: 1
                                              }
                                            ],
                                            label: 'genunix`swap_getapage',
                                            value: 4
                                          }
                                        ],
                                        label: 'genunix`swap_getpage',
                                        value: 4
                                      }
                                    ],
                                    label: 'genunix`fop_getpage',
                                    value: 4
                                  },
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            label: 'unix`hwblkclr',
                                            value: 3
                                          }
                                        ],
                                        label: 'unix`pfnzero',
                                        value: 3
                                      }
                                    ],
                                    label: 'unix`pagezero',
                                    value: 3
                                  }
                                ],
                                label: 'genunix`anon_zero',
                                value: 7
                              }
                            ],
                            label: 'genunix`segvn_faultpage',
                            value: 7
                          },
                          {
                            label: 'ufs`ufs_getpage',
                            value: 1
                          },
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            children: [
                                              {
                                                children: [
                                                  {
                                                    children: [
                                                      {
                                                        children: [
                                                          {
                                                            label: 'unix`hment_compare',
                                                            value: 1
                                                          }
                                                        ],
                                                        label: 'genunix`avl_find',
                                                        value: 1
                                                      }
                                                    ],
                                                    label: 'genunix`avl_add',
                                                    value: 1
                                                  }
                                                ],
                                                label: 'unix`hment_insert',
                                                value: 2
                                              }
                                            ],
                                            label: 'unix`hment_assign',
                                            value: 2
                                          }
                                        ],
                                        label: 'unix`hati_pte_map',
                                        value: 2
                                      }
                                    ],
                                    label: 'unix`hati_load_common',
                                    value: 2
                                  }
                                ],
                                label: 'unix`hat_memload',
                                value: 2
                              }
                            ],
                            label: 'unix`hat_memload_region',
                            value: 2
                          }
                        ],
                        label: 'genunix`segvn_fault',
                        value: 11
                      }
                    ],
                    label: 'genunix`as_fault',
                    value: 12
                  },
                  {
                    label: 'genunix`segvn_fault',
                    value: 1
                  }
                ],
                label: 'unix`pagefault',
                value: 13
              }
            ],
            label: 'unix`trap',
            value: 13
          }
        ],
        label: 'unix`0xfffffffffb8001d6',
        value: 13
      },
      {
        label: 'unix`0xfffffffffb800c7c',
        value: 42
      },
      {
        label: 'unix`0xfffffffffb800c81',
        value: 2
      },
      {
        children: [
          {
            label: 'genunix`gethrtime_unscaled',
            value: 4
          },
          {
            children: [
              {
                children: [
                  {
                    label: 'unix`tsc_gethrtimeunscaled',
                    value: 11
                  },
                  {
                    label: 'unix`tsc_read',
                    value: 186
                  }
                ],
                label: 'genunix`gethrtime_unscaled',
                value: 203
              },
              {
                label: 'unix`tsc_gethrtimeunscaled',
                value: 13
              }
            ],
            label: 'genunix`syscall_mstate',
            value: 355
          },
          {
            label: 'unix`atomic_add_64',
            value: 110
          }
        ],
        label: 'unix`0xfffffffffb800c86',
        value: 472
      },
      {
        children: [
          {
            label: 'genunix`audit_getstate',
            value: 27
          },
          {
            label: 'genunix`clear_stale_fd',
            value: 10
          },
          {
            label: 'genunix`disp_lock_exit',
            value: 27
          },
          {
            children: [
              {
                label: 'FSS`fss_preempt',
                value: 1
              },
              {
                label: 'genunix`audit_getstate',
                value: 15
              },
              {
                label: 'genunix`clear_stale_fd',
                value: 44
              },
              {
                children: [
                  {
                    label: 'unix`clear_int_flag',
                    value: 39
                  },
                  {
                    label: 'unix`do_splx',
                    value: 1993
                  },
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                label: 'unix`do_splx',
                                value: 1
                              }
                            ],
                            label: 'genunix`disp_lock_exit_nopreempt',
                            value: 1
                          }
                        ],
                        label: 'unix`preempt',
                        value: 1
                      }
                    ],
                    label: 'unix`kpreempt',
                    value: 1
                  }
                ],
                label: 'genunix`disp_lock_exit',
                value: 2096
              },
              {
                label: 'genunix`sigcheck',
                value: 1
              },
              {
                children: [
                  {
                    label: 'unix`clear_int_flag',
                    value: 180
                  },
                  {
                    label: 'unix`splr',
                    value: 400
                  }
                ],
                label: 'genunix`thread_lock',
                value: 670
              },
              {
                label: 'unix`do_splx',
                value: 31
              },
              {
                label: 'unix`i_ddi_splhigh',
                value: 23
              },
              {
                label: 'unix`lock_clear_splx',
                value: 28
              },
              {
                label: 'unix`lock_try',
                value: 778
              },
              {
                label: 'unix`lwp_getdatamodel',
                value: 6
              },
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    label: 'unix`tsc_gethrtimeunscaled',
                                    value: 1
                                  }
                                ],
                                label: 'genunix`mstate_thread_onproc_time',
                                value: 1
                              }
                            ],
                            label: 'unix`caps_charge_adjust',
                            value: 1
                          }
                        ],
                        label: 'unix`cpucaps_charge',
                        value: 3
                      },
                      {
                        children: [
                          {
                            label: 'unix`cmt_balance',
                            value: 1
                          },
                          {
                            children: [
                              {
                                label: 'unix`bitset_in_set',
                                value: 1
                              }
                            ],
                            label: 'unix`cpu_wakeup_mwait',
                            value: 1
                          }
                        ],
                        label: 'unix`setbackdq',
                        value: 5
                      }
                    ],
                    label: 'FSS`fss_preempt',
                    value: 8
                  },
                  {
                    label: 'unix`do_splx',
                    value: 1
                  },
                  {
                    children: [
                      {
                        label: 'genunix`disp_lock_exit_high',
                        value: 1
                      },
                      {
                        children: [
                          {
                            label: 'unix`membar_enter',
                            value: 1
                          }
                        ],
                        label: 'unix`disp',
                        value: 1
                      },
                      {
                        label: 'unix`do_splx',
                        value: 1
                      },
                      {
                        children: [
                          {
                            children: [
                              {
                                label: 'genunix`schedctl_save',
                                value: 1
                              }
                            ],
                            label: 'genunix`savectx',
                            value: 2
                          }
                        ],
                        label: 'unix`resume',
                        value: 2
                      }
                    ],
                    label: 'unix`swtch',
                    value: 5
                  }
                ],
                label: 'unix`preempt',
                value: 14
              },
              {
                label: 'unix`prunstop',
                value: 36
              },
              {
                label: 'unix`splr',
                value: 92
              },
              {
                label: 'unix`splx',
                value: 6
              }
            ],
            label: 'genunix`post_syscall',
            value: 4245
          },
          {
            label: 'genunix`thread_lock',
            value: 33
          },
          {
            label: 'unix`lwp_getdatamodel',
            value: 3
          },
          {
            label: 'unix`prunstop',
            value: 2
          }
        ],
        label: 'unix`0xfffffffffb800c91',
        value: 4361
      },
      {
        children: [
          {
            label: 'genunix`gethrtime_unscaled',
            value: 7
          },
          {
            children: [
              {
                children: [
                  {
                    label: 'unix`tsc_gethrtimeunscaled',
                    value: 17
                  },
                  {
                    label: 'unix`tsc_read',
                    value: 160
                  }
                ],
                label: 'genunix`gethrtime_unscaled',
                value: 182
              },
              {
                label: 'unix`tsc_gethrtimeunscaled',
                value: 12
              }
            ],
            label: 'genunix`syscall_mstate',
            value: 412
          },
          {
            label: 'unix`atomic_add_64',
            value: 95
          }
        ],
        label: 'unix`0xfffffffffb800ca0',
        value: 517
      },
      {
        label: 'unix`_sys_rtt',
        value: 6
      },
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                label: 'genunix`cpu_decay',
                                value: 1
                              }
                            ],
                            label: 'genunix`cpu_grow',
                            value: 1
                          }
                        ],
                        label: 'genunix`cpu_update_pct',
                        value: 1
                      }
                    ],
                    label: 'genunix`new_mstate',
                    value: 1
                  }
                ],
                label: 'unix`trap',
                value: 1
              }
            ],
            label: 'unix`sys_rtt_common',
            value: 1
          }
        ],
        label: 'unix`_sys_rtt_ints_disabled',
        value: 1
      },
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    label: 'doorfs`door_close',
                                    value: 1
                                  }
                                ],
                                label: 'namefs`nm_close',
                                value: 1
                              }
                            ],
                            label: 'genunix`fop_close',
                            value: 1
                          }
                        ],
                        label: 'genunix`closef',
                        value: 1
                      }
                    ],
                    label: 'genunix`close_exec',
                    value: 1
                  }
                ],
                label: 'genunix`exec_common',
                value: 1
              }
            ],
            label: 'genunix`exece',
            value: 1
          }
        ],
        label: 'unix`_sys_sysenter_post_swapgs',
        value: 1
      },
      {
        children: [
          {
            label: 'genunix`gethrtime_unscaled',
            value: 11
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            children: [
                                              {
                                                children: [
                                                  {
                                                    label: 'unix`mtype_func',
                                                    value: 1
                                                  },
                                                  {
                                                    label: 'unix`mutex_enter',
                                                    value: 1
                                                  }
                                                ],
                                                label: 'unix`page_get_mnode_freelist',
                                                value: 2
                                              }
                                            ],
                                            label: 'unix`page_get_freelist',
                                            value: 2
                                          }
                                        ],
                                        label: 'unix`page_create_va',
                                        value: 3
                                      }
                                    ],
                                    label: 'genunix`pvn_read_kluster',
                                    value: 3
                                  }
                                ],
                                label: 'ufs`ufs_getpage_ra',
                                value: 3
                              }
                            ],
                            label: 'ufs`ufs_getpage',
                            value: 3
                          }
                        ],
                        label: 'genunix`fop_getpage',
                        value: 3
                      }
                    ],
                    label: 'genunix`segvn_faulta',
                    value: 3
                  }
                ],
                label: 'genunix`as_faulta',
                value: 3
              }
            ],
            label: 'genunix`memcntl',
            value: 3
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            label: 'unix`htable_lookup',
                                            value: 1
                                          }
                                        ],
                                        label: 'unix`htable_walk',
                                        value: 1
                                      }
                                    ],
                                    label: 'unix`hat_unload_callback',
                                    value: 1
                                  }
                                ],
                                label: 'genunix`segvn_unmap',
                                value: 1
                              }
                            ],
                            label: 'genunix`as_unmap',
                            value: 1
                          }
                        ],
                        label: 'unix`mmapobj_map_elf',
                        value: 1
                      }
                    ],
                    label: 'unix`mmapobj_map_interpret',
                    value: 1
                  }
                ],
                label: 'unix`mmapobj',
                value: 1
              }
            ],
            label: 'genunix`mmapobjsys',
            value: 1
          },
          {
            children: [
              {
                label: 'genunix`copen',
                value: 7
              },
              {
                children: [
                  {
                    label: 'genunix`audit_getstate',
                    value: 62
                  },
                  {
                    children: [
                      {
                        label: 'genunix`audit_falloc',
                        value: 8
                      },
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            label: 'unix`swtch',
                                            value: 1
                                          }
                                        ],
                                        label: 'unix`preempt',
                                        value: 1
                                      }
                                    ],
                                    label: 'unix`kpreempt',
                                    value: 1
                                  }
                                ],
                                label: 'unix`sys_rtt_common',
                                value: 1
                              }
                            ],
                            label: 'unix`_sys_rtt_ints_disabled',
                            value: 1
                          }
                        ],
                        label: 'genunix`audit_getstate',
                        value: 66
                      },
                      {
                        label: 'genunix`audit_unfalloc',
                        value: 32
                      },
                      {
                        label: 'genunix`crfree',
                        value: 9
                      },
                      {
                        label: 'genunix`crhold',
                        value: 5
                      },
                      {
                        label: 'genunix`cv_broadcast',
                        value: 16
                      },
                      {
                        children: [
                          {
                            children: [
                              {
                                label: 'genunix`kmem_cache_alloc',
                                value: 11
                              },
                              {
                                children: [
                                  {
                                    label: 'genunix`kmem_cache_alloc',
                                    value: 66
                                  },
                                  {
                                    label: 'unix`mutex_enter',
                                    value: 122
                                  },
                                  {
                                    label: 'unix`mutex_exit',
                                    value: 46
                                  }
                                ],
                                label: 'genunix`kmem_zalloc',
                                value: 280
                              },
                              {
                                label: 'unix`bzero',
                                value: 8
                              }
                            ],
                            label: 'genunix`audit_falloc',
                            value: 313
                          },
                          {
                            label: 'genunix`crhold',
                            value: 11
                          },
                          {
                            label: 'genunix`kmem_cache_alloc',
                            value: 49
                          },
                          {
                            label: 'genunix`kmem_zalloc',
                            value: 13
                          },
                          {
                            children: [
                              {
                                label: 'genunix`fd_find',
                                value: 13
                              },
                              {
                                label: 'genunix`fd_reserve',
                                value: 9
                              },
                              {
                                children: [
                                  {
                                    label: 'genunix`fd_find',
                                    value: 161
                                  },
                                  {
                                    label: 'genunix`fd_reserve',
                                    value: 15
                                  }
                                ],
                                label: 'genunix`ufalloc_file',
                                value: 294
                              },
                              {
                                label: 'unix`mutex_enter',
                                value: 197
                              },
                              {
                                label: 'unix`mutex_exit',
                                value: 29
                              }
                            ],
                            label: 'genunix`ufalloc',
                            value: 551
                          },
                          {
                            label: 'genunix`ufalloc_file',
                            value: 20
                          },
                          {
                            label: 'unix`atomic_add_32',
                            value: 134
                          },
                          {
                            label: 'unix`mutex_enter',
                            value: 99
                          },
                          {
                            label: 'unix`mutex_exit',
                            value: 58
                          }
                        ],
                        label: 'genunix`falloc',
                        value: 1363
                      },
                      {
                        label: 'genunix`fd_reserve',
                        value: 8
                      },
                      {
                        label: 'genunix`kmem_cache_alloc',
                        value: 9
                      },
                      {
                        label: 'genunix`kmem_cache_free',
                        value: 5
                      },
                      {
                        label: 'genunix`lookupnameat',
                        value: 69
                      },
                      {
                        label: 'genunix`set_errno',
                        value: 24
                      },
                      {
                        children: [
                          {
                            label: 'genunix`audit_getstate',
                            value: 31
                          },
                          {
                            label: 'genunix`cv_broadcast',
                            value: 25
                          },
                          {
                            label: 'genunix`fd_reserve',
                            value: 35
                          }
                        ],
                        label: 'genunix`setf',
                        value: 187
                      },
                      {
                        label: 'genunix`ufalloc',
                        value: 10
                      },
                      {
                        children: [
                          {
                            children: [
                              {
                                label: 'genunix`kmem_cache_free',
                                value: 5
                              },
                              {
                                children: [
                                  {
                                    label: 'genunix`kmem_cache_free',
                                    value: 73
                                  },
                                  {
                                    label: 'unix`mutex_enter',
                                    value: 111
                                  },
                                  {
                                    label: 'unix`mutex_exit',
                                    value: 55
                                  }
                                ],
                                label: 'genunix`kmem_free',
                                value: 288
                              }
                            ],
                            label: 'genunix`audit_unfalloc',
                            value: 340
                          },
                          {
                            label: 'genunix`crfree',
                            value: 13
                          },
                          {
                            label: 'genunix`kmem_cache_free',
                            value: 51
                          },
                          {
                            label: 'genunix`kmem_free',
                            value: 11
                          },
                          {
                            label: 'unix`atomic_add_32_nv',
                            value: 100
                          },
                          {
                            label: 'unix`mutex_enter',
                            value: 97
                          },
                          {
                            label: 'unix`mutex_exit',
                            value: 56
                          }
                        ],
                        label: 'genunix`unfalloc',
                        value: 729
                      },
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        label: 'genunix`audit_getstate',
                                        value: 16
                                      },
                                      {
                                        label: 'genunix`fop_lookup',
                                        value: 55
                                      },
                                      {
                                        children: [
                                          {
                                            label: 'genunix`audit_getstate',
                                            value: 21
                                          },
                                          {
                                            label: 'genunix`crgetmapped',
                                            value: 55
                                          },
                                          {
                                            label: 'genunix`fop_inactive',
                                            value: 39
                                          },
                                          {
                                            children: [
                                              {
                                                label: 'genunix`crgetmapped',
                                                value: 57
                                              },
                                              {
                                                label: 'genunix`dnlc_lookup',
                                                value: 26
                                              },
                                              {
                                                label: 'genunix`fop_lookup',
                                                value: 85
                                              },
                                              {
                                                label: 'genunix`kmem_alloc',
                                                value: 73
                                              },
                                              {
                                                label: 'genunix`traverse',
                                                value: 30
                                              },
                                              {
                                                label: 'genunix`vfs_matchops',
                                                value: 28
                                              },
                                              {
                                                children: [
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`kmem_cache_alloc',
                                                        value: 241
                                                      },
                                                      {
                                                        label: 'unix`mutex_enter',
                                                        value: 366
                                                      },
                                                      {
                                                        label: 'unix`mutex_exit',
                                                        value: 149
                                                      }
                                                    ],
                                                    label: 'genunix`kmem_alloc',
                                                    value: 934
                                                  },
                                                  {
                                                    label: 'genunix`kmem_cache_alloc',
                                                    value: 32
                                                  }
                                                ],
                                                label: 'genunix`vn_setpath',
                                                value: 1969
                                              },
                                              {
                                                children: [
                                                  {
                                                    label: 'genunix`crgetmapped',
                                                    value: 36
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`crgetmapped',
                                                        value: 58
                                                      },
                                                      {
                                                        label: 'genunix`dnlc_lookup',
                                                        value: 70
                                                      },
                                                      {
                                                        label: 'genunix`vn_rele',
                                                        value: 14
                                                      },
                                                      {
                                                        label: 'ufs`ufs_iaccess',
                                                        value: 91
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`crgetuid',
                                                            value: 30
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                label: 'genunix`memcmp',
                                                                value: 38
                                                              },
                                                              {
                                                                children: [
                                                                  {
                                                                    label: 'genunix`memcmp',
                                                                    value: 277
                                                                  }
                                                                ],
                                                                label: 'unix`bcmp',
                                                                value: 295
                                                              }
                                                            ],
                                                            label: 'genunix`dnlc_lookup',
                                                            value: 1843
                                                          },
                                                          {
                                                            label: 'genunix`secpolicy_vnode_access2',
                                                            value: 72
                                                          },
                                                          {
                                                            label: 'genunix`vn_rele',
                                                            value: 39
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                label: 'genunix`crgetuid',
                                                                value: 22
                                                              },
                                                              {
                                                                label: 'genunix`secpolicy_vnode_access2',
                                                                value: 217
                                                              }
                                                            ],
                                                            label: 'ufs`ufs_iaccess',
                                                            value: 648
                                                          },
                                                          {
                                                            label: 'unix`bcmp',
                                                            value: 42
                                                          },
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 980
                                                          },
                                                          {
                                                            label: 'unix`mutex_exit',
                                                            value: 350
                                                          },
                                                          {
                                                            label: 'unix`rw_enter',
                                                            value: 525
                                                          },
                                                          {
                                                            label: 'unix`rw_exit',
                                                            value: 439
                                                          }
                                                        ],
                                                        label: 'ufs`ufs_lookup',
                                                        value: 5399
                                                      }
                                                    ],
                                                    label: 'genunix`fop_lookup',
                                                    value: 6470
                                                  },
                                                  {
                                                    label: 'genunix`kmem_cache_alloc',
                                                    value: 39
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`rwst_exit',
                                                        value: 18
                                                      },
                                                      {
                                                        label: 'genunix`rwst_tryenter',
                                                        value: 32
                                                      },
                                                      {
                                                        label: 'genunix`vn_mountedvfs',
                                                        value: 11
                                                      },
                                                      {
                                                        label: 'genunix`vn_vfslocks_getlock',
                                                        value: 62
                                                      },
                                                      {
                                                        label: 'genunix`vn_vfslocks_rele',
                                                        value: 50
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`kmem_alloc',
                                                            value: 32
                                                          },
                                                          {
                                                            label: 'genunix`rwst_enter_common',
                                                            value: 32
                                                          },
                                                          {
                                                            label: 'genunix`rwst_init',
                                                            value: 28
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                label: 'genunix`rwst_enter_common',
                                                                value: 264
                                                              },
                                                              {
                                                                label: 'unix`mutex_enter',
                                                                value: 337
                                                              },
                                                              {
                                                                label: 'unix`mutex_exit',
                                                                value: 105
                                                              }
                                                            ],
                                                            label: 'genunix`rwst_tryenter',
                                                            value: 734
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                label: 'genunix`cv_init',
                                                                value: 53
                                                              },
                                                              {
                                                                children: [
                                                                  {
                                                                    children: [
                                                                      {
                                                                        label: 'genunix`kmem_cpu_reload',
                                                                        value: 2
                                                                      }
                                                                    ],
                                                                    label: 'genunix`kmem_cache_alloc',
                                                                    value: 168
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_enter',
                                                                    value: 379
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_exit',
                                                                    value: 155
                                                                  }
                                                                ],
                                                                label: 'genunix`kmem_alloc',
                                                                value: 795
                                                              },
                                                              {
                                                                label: 'genunix`kmem_cache_alloc',
                                                                value: 29
                                                              },
                                                              {
                                                                children: [
                                                                  {
                                                                    label: 'genunix`cv_init',
                                                                    value: 65
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_init',
                                                                    value: 53
                                                                  }
                                                                ],
                                                                label: 'genunix`rwst_init',
                                                                value: 236
                                                              },
                                                              {
                                                                label: 'unix`mutex_init',
                                                                value: 46
                                                              }
                                                            ],
                                                            label: 'genunix`vn_vfslocks_getlock',
                                                            value: 1357
                                                          },
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 727
                                                          },
                                                          {
                                                            label: 'unix`mutex_exit',
                                                            value: 371
                                                          }
                                                        ],
                                                        label: 'genunix`vn_vfsrlock',
                                                        value: 3342
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`cv_broadcast',
                                                            value: 25
                                                          },
                                                          {
                                                            label: 'genunix`kmem_free',
                                                            value: 35
                                                          },
                                                          {
                                                            label: 'genunix`rwst_destroy',
                                                            value: 32
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                label: 'genunix`cv_broadcast',
                                                                value: 40
                                                              }
                                                            ],
                                                            label: 'genunix`rwst_exit',
                                                            value: 167
                                                          },
                                                          {
                                                            label: 'genunix`vn_vfslocks_getlock',
                                                            value: 120
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                label: 'genunix`cv_destroy',
                                                                value: 77
                                                              },
                                                              {
                                                                label: 'genunix`kmem_cache_free',
                                                                value: 22
                                                              },
                                                              {
                                                                children: [
                                                                  {
                                                                    label: 'genunix`kmem_cache_free',
                                                                    value: 154
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_enter',
                                                                    value: 316
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_exit',
                                                                    value: 148
                                                                  }
                                                                ],
                                                                label: 'genunix`kmem_free',
                                                                value: 693
                                                              },
                                                              {
                                                                children: [
                                                                  {
                                                                    label: 'genunix`cv_destroy',
                                                                    value: 42
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_destroy',
                                                                    value: 176
                                                                  }
                                                                ],
                                                                label: 'genunix`rwst_destroy',
                                                                value: 296
                                                              },
                                                              {
                                                                label: 'unix`mutex_destroy',
                                                                value: 31
                                                              }
                                                            ],
                                                            label: 'genunix`vn_vfslocks_rele',
                                                            value: 1420
                                                          },
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 1202
                                                          },
                                                          {
                                                            label: 'unix`mutex_exit',
                                                            value: 512
                                                          }
                                                        ],
                                                        label: 'genunix`vn_vfsunlock',
                                                        value: 3578
                                                      }
                                                    ],
                                                    label: 'genunix`traverse',
                                                    value: 7243
                                                  },
                                                  {
                                                    label: 'genunix`vfs_getops',
                                                    value: 21
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`vfs_getops',
                                                        value: 157
                                                      },
                                                      {
                                                        label: 'unix`membar_consumer',
                                                        value: 123
                                                      }
                                                    ],
                                                    label: 'genunix`vfs_matchops',
                                                    value: 336
                                                  },
                                                  {
                                                    label: 'genunix`vn_alloc',
                                                    value: 20
                                                  },
                                                  {
                                                    label: 'genunix`vn_exists',
                                                    value: 17
                                                  },
                                                  {
                                                    label: 'genunix`vn_mountedvfs',
                                                    value: 30
                                                  },
                                                  {
                                                    label: 'genunix`vn_setops',
                                                    value: 41
                                                  },
                                                  {
                                                    label: 'genunix`vn_vfsrlock',
                                                    value: 13
                                                  },
                                                  {
                                                    label: 'genunix`vn_vfsunlock',
                                                    value: 40
                                                  },
                                                  {
                                                    label: 'lofs`lfind',
                                                    value: 26
                                                  },
                                                  {
                                                    label: 'lofs`lsave',
                                                    value: 27
                                                  },
                                                  {
                                                    label: 'lofs`makelfsnode',
                                                    value: 28
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`kmem_cache_alloc',
                                                        value: 234
                                                      },
                                                      {
                                                        label: 'genunix`kmem_cpu_reload',
                                                        value: 1
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`kmem_cache_alloc',
                                                            value: 179
                                                          },
                                                          {
                                                            label: 'genunix`vn_recycle',
                                                            value: 33
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                children: [
                                                                  {
                                                                    label: 'genunix`vsd_free',
                                                                    value: 155
                                                                  }
                                                                ],
                                                                label: 'genunix`vn_recycle',
                                                                value: 319
                                                              },
                                                              {
                                                                label: 'genunix`vsd_free',
                                                                value: 14
                                                              }
                                                            ],
                                                            label: 'genunix`vn_reinit',
                                                            value: 424
                                                          },
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 318
                                                          },
                                                          {
                                                            label: 'unix`mutex_exit',
                                                            value: 142
                                                          }
                                                        ],
                                                        label: 'genunix`vn_alloc',
                                                        value: 1189
                                                      },
                                                      {
                                                        label: 'genunix`vn_exists',
                                                        value: 50
                                                      },
                                                      {
                                                        label: 'genunix`vn_reinit',
                                                        value: 48
                                                      },
                                                      {
                                                        label: 'genunix`vn_setops',
                                                        value: 160
                                                      },
                                                      {
                                                        label: 'lofs`lfind',
                                                        value: 278
                                                      },
                                                      {
                                                        label: 'lofs`lsave',
                                                        value: 162
                                                      },
                                                      {
                                                        label: 'lofs`makelfsnode',
                                                        value: 82
                                                      },
                                                      {
                                                        label: 'lofs`table_lock_enter',
                                                        value: 220
                                                      },
                                                      {
                                                        label: 'unix`atomic_cas_64',
                                                        value: 318
                                                      },
                                                      {
                                                        label: 'unix`membar_consumer',
                                                        value: 237
                                                      },
                                                      {
                                                        label: 'unix`mutex_enter',
                                                        value: 640
                                                      },
                                                      {
                                                        label: 'unix`mutex_exit',
                                                        value: 138
                                                      }
                                                    ],
                                                    label: 'lofs`makelonode',
                                                    value: 4212
                                                  },
                                                  {
                                                    label: 'lofs`table_lock_enter',
                                                    value: 43
                                                  },
                                                  {
                                                    label: 'ufs`ufs_lookup',
                                                    value: 46
                                                  },
                                                  {
                                                    label: 'unix`atomic_add_32',
                                                    value: 325
                                                  },
                                                  {
                                                    label: 'unix`mutex_exit',
                                                    value: 26
                                                  }
                                                ],
                                                label: 'lofs`lo_lookup',
                                                value: 19887
                                              },
                                              {
                                                label: 'lofs`makelonode',
                                                value: 39
                                              },
                                              {
                                                label: 'unix`bcopy',
                                                value: 896
                                              },
                                              {
                                                label: 'unix`mutex_enter',
                                                value: 947
                                              },
                                              {
                                                label: 'unix`mutex_exit',
                                                value: 337
                                              },
                                              {
                                                children: [
                                                  {
                                                    children: [
                                                      {
                                                        children: [
                                                          {
                                                            label: 'unix`dispatch_hilevel',
                                                            value: 1
                                                          }
                                                        ],
                                                        label: 'unix`do_interrupt',
                                                        value: 1
                                                      }
                                                    ],
                                                    label: 'unix`_interrupt',
                                                    value: 1
                                                  }
                                                ],
                                                label: 'unix`strlen',
                                                value: 2659
                                              },
                                              {
                                                label: 'zfs`specvp_check',
                                                value: 10
                                              },
                                              {
                                                label: 'zfs`zfs_fastaccesschk_execute',
                                                value: 4
                                              },
                                              {
                                                children: [
                                                  {
                                                    label: 'genunix`crgetuid',
                                                    value: 6
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`memcmp',
                                                        value: 3
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`memcmp',
                                                            value: 38
                                                          }
                                                        ],
                                                        label: 'unix`bcmp',
                                                        value: 45
                                                      }
                                                    ],
                                                    label: 'genunix`dnlc_lookup',
                                                    value: 263
                                                  },
                                                  {
                                                    label: 'unix`bcmp',
                                                    value: 11
                                                  },
                                                  {
                                                    label: 'unix`mutex_enter',
                                                    value: 309
                                                  },
                                                  {
                                                    label: 'unix`mutex_exit',
                                                    value: 135
                                                  },
                                                  {
                                                    label: 'zfs`specvp_check',
                                                    value: 20
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`crgetuid',
                                                        value: 2
                                                      }
                                                    ],
                                                    label: 'zfs`zfs_fastaccesschk_execute',
                                                    value: 50
                                                  }
                                                ],
                                                label: 'zfs`zfs_lookup',
                                                value: 946
                                              }
                                            ],
                                            label: 'genunix`fop_lookup',
                                            value: 29216
                                          },
                                          {
                                            label: 'genunix`fsop_root',
                                            value: 62
                                          },
                                          {
                                            label: 'genunix`pn_fixslash',
                                            value: 44
                                          },
                                          {
                                            label: 'genunix`pn_getcomponent',
                                            value: 454
                                          },
                                          {
                                            children: [
                                              {
                                                children: [
                                                  {
                                                    label: 'lofs`lo_root',
                                                    value: 80
                                                  },
                                                  {
                                                    label: 'unix`mutex_enter',
                                                    value: 95
                                                  },
                                                  {
                                                    label: 'unix`mutex_exit',
                                                    value: 59
                                                  }
                                                ],
                                                label: 'genunix`fsop_root',
                                                value: 297
                                              },
                                              {
                                                label: 'genunix`rwst_exit',
                                                value: 12
                                              },
                                              {
                                                label: 'genunix`rwst_tryenter',
                                                value: 37
                                              },
                                              {
                                                label: 'genunix`vn_mountedvfs',
                                                value: 20
                                              },
                                              {
                                                label: 'genunix`vn_rele',
                                                value: 19
                                              },
                                              {
                                                label: 'genunix`vn_vfslocks_getlock',
                                                value: 47
                                              },
                                              {
                                                label: 'genunix`vn_vfslocks_rele',
                                                value: 34
                                              },
                                              {
                                                children: [
                                                  {
                                                    label: 'genunix`kmem_alloc',
                                                    value: 11
                                                  },
                                                  {
                                                    label: 'genunix`rwst_enter_common',
                                                    value: 28
                                                  },
                                                  {
                                                    label: 'genunix`rwst_init',
                                                    value: 13
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`rwst_enter_common',
                                                        value: 314
                                                      },
                                                      {
                                                        label: 'unix`mutex_enter',
                                                        value: 238
                                                      },
                                                      {
                                                        label: 'unix`mutex_exit',
                                                        value: 49
                                                      }
                                                    ],
                                                    label: 'genunix`rwst_tryenter',
                                                    value: 628
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`cv_init',
                                                        value: 56
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`kmem_cache_alloc',
                                                            value: 126
                                                          },
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 252
                                                          },
                                                          {
                                                            label: 'unix`mutex_exit',
                                                            value: 95
                                                          }
                                                        ],
                                                        label: 'genunix`kmem_alloc',
                                                        value: 533
                                                      },
                                                      {
                                                        label: 'genunix`kmem_cache_alloc',
                                                        value: 17
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`cv_init',
                                                            value: 49
                                                          },
                                                          {
                                                            label: 'unix`mutex_init',
                                                            value: 38
                                                          }
                                                        ],
                                                        label: 'genunix`rwst_init',
                                                        value: 173
                                                      },
                                                      {
                                                        label: 'unix`mutex_init',
                                                        value: 31
                                                      }
                                                    ],
                                                    label: 'genunix`vn_vfslocks_getlock',
                                                    value: 973
                                                  },
                                                  {
                                                    label: 'unix`mutex_enter',
                                                    value: 455
                                                  },
                                                  {
                                                    label: 'unix`mutex_exit',
                                                    value: 250
                                                  }
                                                ],
                                                label: 'genunix`vn_vfsrlock',
                                                value: 2414
                                              },
                                              {
                                                children: [
                                                  {
                                                    label: 'genunix`cv_broadcast',
                                                    value: 14
                                                  },
                                                  {
                                                    label: 'genunix`kmem_free',
                                                    value: 17
                                                  },
                                                  {
                                                    label: 'genunix`rwst_destroy',
                                                    value: 20
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`cv_broadcast',
                                                        value: 19
                                                      }
                                                    ],
                                                    label: 'genunix`rwst_exit',
                                                    value: 110
                                                  },
                                                  {
                                                    label: 'genunix`vn_vfslocks_getlock',
                                                    value: 79
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`cv_destroy',
                                                        value: 81
                                                      },
                                                      {
                                                        label: 'genunix`kmem_cache_free',
                                                        value: 18
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`kmem_cache_free',
                                                            value: 116
                                                          },
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 195
                                                          },
                                                          {
                                                            label: 'unix`mutex_exit',
                                                            value: 90
                                                          }
                                                        ],
                                                        label: 'genunix`kmem_free',
                                                        value: 457
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            label: 'genunix`cv_destroy',
                                                            value: 31
                                                          },
                                                          {
                                                            label: 'unix`mutex_destroy',
                                                            value: 53
                                                          }
                                                        ],
                                                        label: 'genunix`rwst_destroy',
                                                        value: 146
                                                      },
                                                      {
                                                        label: 'unix`mutex_destroy',
                                                        value: 17
                                                      }
                                                    ],
                                                    label: 'genunix`vn_vfslocks_rele',
                                                    value: 903
                                                  },
                                                  {
                                                    label: 'unix`mutex_enter',
                                                    value: 823
                                                  },
                                                  {
                                                    label: 'unix`mutex_exit',
                                                    value: 356
                                                  }
                                                ],
                                                label: 'genunix`vn_vfsunlock',
                                                value: 2372
                                              },
                                              {
                                                label: 'lofs`lo_root',
                                                value: 31
                                              },
                                              {
                                                label: 'unix`mutex_enter',
                                                value: 95
                                              },
                                              {
                                                label: 'unix`mutex_exit',
                                                value: 56
                                              }
                                            ],
                                            label: 'genunix`traverse',
                                            value: 5557
                                          },
                                          {
                                            label: 'genunix`vn_mountedvfs',
                                            value: 43
                                          },
                                          {
                                            children: [
                                              {
                                                label: 'genunix`crgetmapped',
                                                value: 31
                                              },
                                              {
                                                children: [
                                                  {
                                                    label: 'genunix`crgetmapped',
                                                    value: 41
                                                  },
                                                  {
                                                    label: 'lofs`freelonode',
                                                    value: 35
                                                  },
                                                  {
                                                    children: [
                                                      {
                                                        label: 'genunix`kmem_cache_free',
                                                        value: 29
                                                      },
                                                      {
                                                        label: 'genunix`vn_free',
                                                        value: 26
                                                      },
                                                      {
                                                        label: 'genunix`vn_invalid',
                                                        value: 20
                                                      },
                                                      {
                                                        label: 'genunix`vn_rele',
                                                        value: 25
                                                      },
                                                      {
                                                        children: [
                                                          {
                                                            children: [
                                                              {
                                                                label: 'genunix`kmem_cpu_reload',
                                                                value: 1
                                                              }
                                                            ],
                                                            label: 'genunix`kmem_cache_free',
                                                            value: 184
                                                          },
                                                          {
                                                            label: 'genunix`kmem_free',
                                                            value: 115
                                                          },
                                                          {
                                                            children: [
                                                              {
                                                                children: [
                                                                  {
                                                                    label: 'genunix`kmem_cpu_reload',
                                                                    value: 4
                                                                  }
                                                                ],
                                                                label: 'genunix`kmem_cache_free',
                                                                value: 215
                                                              },
                                                              {
                                                                label: 'genunix`kmem_cpu_reload',
                                                                value: 5
                                                              },
                                                              {
                                                                children: [
                                                                  {
                                                                    label: 'genunix`kmem_cache_free',
                                                                    value: 209
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_enter',
                                                                    value: 299
                                                                  },
                                                                  {
                                                                    label: 'unix`mutex_exit',
                                                                    value: 160
                                                                  }
                                                                ],
                                                                label: 'genunix`kmem_free',
                                                                value: 785
                                                              },
                                                              {
                                                                label: 'genunix`vsd_free',
                                                                value: 48
                                                              },
                                                              {
                                                                label: 'unix`mutex_enter',
                                                                value: 314
                                                              },
                                                              {
                                                                label: 'unix`mutex_exit',
                                                                value: 171
                                                              }
                                                            ],
                                                            label: 'genunix`vn_free',
                                                            value: 1663
                                                          },
                                                          {
                                                            label: 'genunix`vn_invalid',
                                                            value: 47
                                                          },
                                                          {
                                                            label: 'genunix`vn_rele',
                                                            value: 64
                                                          },
                                                          {
                                                            label: 'genunix`vsd_free',
                                                            value: 17
                                                          },
                                                          {
                                                            label: 'lofs`table_lock_enter',
                                                            value: 189
                                                          },
                                                          {
                                                            label: 'unix`membar_consumer',
                                                            value: 106
                                                          },
                                                          {
                                                            label: 'unix`mutex_enter',
                                                            value: 905
                                                          },
                                                          {
                                                            label: 'unix`mutex_exit',
                                                            value: 358
                                                          },
                                                          {
                                                            label: 'unix`strlen',
                                                            value: 1238
                                                          }
                                                        ],
                                                        label: 'lofs`freelonode',
                                                        value: 5313
                                                      },
                                                      {
                                                        label: 'lofs`table_lock_enter',
                                                        value: 44
                                                      },
                                                      {
                                                        label: 'unix`atomic_add_32',
                                                        value: 292
                                                      },
                                                      {
                                                        label: 'unix`mutex_enter',
                                                        value: 279
                                                      },
                                                      {
                                                        label: 'unix`mutex_exit',
                                                        value: 212
                                                      }
                                                    ],
                                                    label: 'lofs`lo_inactive',
                                                    value: 6307
                                                  }
                                                ],
                                                label: 'genunix`fop_inactive',
                                                value: 6689
                                              },
                                              {
                                                label: 'lofs`lo_inactive',
                                                value: 21
                                              }
                                            ],
                                            label: 'genunix`vn_rele',
                                            value: 6943
                                          },
                                          {
                                            label: 'genunix`vn_setpath',
                                            value: 58
                                          },
                                          {
                                            label: 'genunix`vn_vfsrlock',
                                            value: 12
                                          },
                                          {
                                            label: 'genunix`vn_vfsunlock',
                                            value: 20
                                          },
                                          {
                                            label: 'lofs`lo_lookup',
                                            value: 65
                                          },
                                          {
                                            label: 'unix`mutex_enter',
                                            value: 575
                                          },
                                          {
                                            label: 'unix`mutex_exit',
                                            value: 379
                                          },
                                          {
                                            label: 'unix`strlen',
                                            value: 107
                                          },
                                          {
                                            label: 'zfs`zfs_lookup',
                                            value: 22
                                          }
                                        ],
                                        label: 'genunix`lookuppnvp',
                                        value: 44242
                                      },
                                      {
                                        label: 'genunix`pn_fixslash',
                                        value: 14
                                      },
                                      {
                                        label: 'genunix`pn_getcomponent',
                                        value: 41
                                      },
                                      {
                                        label: 'genunix`traverse',
                                        value: 17
                                      },
                                      {
                                        label: 'genunix`vn_mountedvfs',
                                        value: 56
                                      },
                                      {
                                        label: 'genunix`vn_rele',
                                        value: 73
                                      },
                                      {
                                        children: [
                                          {
                                            label: 'unix`mutex_delay_default',
                                            value: 1
                                          },
                                          {
                                            label: 'unix`tsc_read',
                                            value: 1
                                          }
                                        ],
                                        label: 'unix`mutex_vector_enter',
                                        value: 2
                                      }
                                    ],
                                    label: 'genunix`lookuppnatcred',
                                    value: 44681
                                  },
                                  {
                                    label: 'genunix`lookuppnvp',
                                    value: 10
                                  },
                                  {
                                    children: [
                                      {
                                        label: 'unix`copyinstr',
                                        value: 25
                                      },
                                      {
                                        label: 'unix`copystr',
                                        value: 598
                                      }
                                    ],
                                    label: 'genunix`pn_get_buf',
                                    value: 687
                                  },
                                  {
                                    label: 'unix`copyinstr',
                                    value: 18
                                  },
                                  {
                                    label: 'unix`mutex_enter',
                                    value: 320
                                  },
                                  {
                                    label: 'unix`mutex_exit',
                                    value: 163
                                  }
                                ],
                                label: 'genunix`lookupnameatcred',
                                value: 45978
                              },
                              {
                                label: 'genunix`lookuppnatcred',
                                value: 12
                              },
                              {
                                label: 'genunix`pn_get_buf',
                                value: 13
                              }
                            ],
                            label: 'genunix`lookupnameat',
                            value: 46075
                          },
                          {
                            label: 'genunix`lookupnameatcred',
                            value: 22
                          }
                        ],
                        label: 'genunix`vn_openat',
                        value: 46342
                      },
                      {
                        label: 'unix`mutex_enter',
                        value: 303
                      },
                      {
                        label: 'unix`mutex_exit',
                        value: 38
                      }
                    ],
                    label: 'genunix`copen',
                    value: 49444
                  },
                  {
                    label: 'genunix`falloc',
                    value: 36
                  },
                  {
                    label: 'genunix`set_errno',
                    value: 9
                  },
                  {
                    label: 'genunix`setf',
                    value: 16
                  },
                  {
                    label: 'genunix`unfalloc',
                    value: 39
                  },
                  {
                    label: 'genunix`vn_openat',
                    value: 14
                  }
                ],
                label: 'genunix`openat',
                value: 49647
              }
            ],
            label: 'genunix`open',
            value: 49669
          },
          {
            label: 'genunix`openat',
            value: 17
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        label: 'genunix`dotoprocs',
                        value: 1
                      }
                    ],
                    label: 'genunix`doprio',
                    value: 1
                  }
                ],
                label: 'genunix`priocntl_common',
                value: 1
              }
            ],
            label: 'genunix`priocntlsys',
            value: 1
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            label: 'genunix`dnlc_lookup',
                                            value: 1
                                          }
                                        ],
                                        label: 'ufs`ufs_lookup',
                                        value: 1
                                      }
                                    ],
                                    label: 'genunix`fop_lookup',
                                    value: 1
                                  }
                                ],
                                label: 'lofs`lo_lookup',
                                value: 1
                              }
                            ],
                            label: 'genunix`fop_lookup',
                            value: 1
                          }
                        ],
                        label: 'genunix`lookuppnvp',
                        value: 1
                      }
                    ],
                    label: 'genunix`lookuppnatcred',
                    value: 1
                  }
                ],
                label: 'genunix`lookuppn',
                value: 1
              }
            ],
            label: 'genunix`resolvepath',
            value: 1
          },
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        label: 'genunix`kmem_cache_free',
                                        value: 1
                                      }
                                    ],
                                    label: 'genunix`kmem_free',
                                    value: 1
                                  }
                                ],
                                label: 'genunix`removectx',
                                value: 1
                              }
                            ],
                            label: 'genunix`schedctl_lwp_cleanup',
                            value: 1
                          }
                        ],
                        label: 'genunix`exitlwps',
                        value: 1
                      },
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            children: [
                                              {
                                                children: [
                                                  {
                                                    label: 'unix`hment_compare',
                                                    value: 2
                                                  }
                                                ],
                                                label: 'genunix`avl_find',
                                                value: 2
                                              }
                                            ],
                                            label: 'unix`hment_remove',
                                            value: 2
                                          },
                                          {
                                            label: 'unix`page_numtopp_nolock',
                                            value: 1
                                          }
                                        ],
                                        label: 'unix`hat_pte_unmap',
                                        value: 3
                                      }
                                    ],
                                    label: 'unix`hat_unload_callback',
                                    value: 3
                                  }
                                ],
                                label: 'genunix`segvn_unmap',
                                value: 3
                              }
                            ],
                            label: 'genunix`as_free',
                            value: 3
                          }
                        ],
                        label: 'genunix`relvm',
                        value: 3
                      },
                      {
                        children: [
                          {
                            children: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        label: 'genunix`vmem_free',
                                        value: 1
                                      }
                                    ],
                                    label: 'genunix`segkp_release_internal',
                                    value: 1
                                  }
                                ],
                                label: 'genunix`segkp_release',
                                value: 1
                              }
                            ],
                            label: 'genunix`schedctl_freepage',
                            value: 1
                          }
                        ],
                        label: 'genunix`schedctl_proc_cleanup',
                        value: 1
                      }
                    ],
                    label: 'genunix`proc_exit',
                    value: 5
                  }
                ],
                label: 'genunix`exit',
                value: 5
              }
            ],
            label: 'genunix`rexit',
            value: 5
          },
          {
            children: [
              {
                children: [
                  {
                    label: 'unix`tsc_gethrtimeunscaled',
                    value: 43
                  },
                  {
                    label: 'unix`tsc_read',
                    value: 367
                  }
                ],
                label: 'genunix`gethrtime_unscaled',
                value: 420
              },
              {
                label: 'unix`tsc_gethrtimeunscaled',
                value: 59
              }
            ],
            label: 'genunix`syscall_mstate',
            value: 1336
          },
          {
            label: 'unix`atomic_add_64',
            value: 205
          }
        ],
        label: 'unix`sys_syscall',
        value: 51908
      }
    ],
    label: 'root',
    value: 57412
  }
];
