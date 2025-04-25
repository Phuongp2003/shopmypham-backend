import { Router } from 'express';

export const authSwagger = {
  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        description: 'Login with email and password. Returns access token and sets refresh token in HTTP-only cookie.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email'
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'User password'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'User ID'
                        },
                        email: {
                          type: 'string',
                          description: 'User email'
                        },
                        name: {
                          type: 'string',
                          description: 'User name'
                        },
                        role: {
                          type: 'string',
                          enum: ['admin', 'user'],
                          description: 'User role'
                        },
                        googleId: {
                          type: 'string',
                          description: 'Google ID (if logged in with Google)',
                          nullable: true
                        }
                      }
                    },
                    accessToken: {
                      type: 'string',
                      description: 'JWT access token'
                    },
                    refreshToken: {
                      type: 'string',
                      description: 'JWT refresh token'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Invalid credentials'
          }
        }
      }
    },
    '/auth/google': {
      get: {
        tags: ['Auth'],
        summary: 'Google OAuth Login',
        description: 'Initiates Google OAuth flow',
        responses: {
          '302': {
            description: 'Redirects to Google login page'
          }
        }
      }
    },
    '/auth/google/callback': {
      get: {
        tags: ['Auth'],
        summary: 'Google OAuth Callback',
        description: 'Callback endpoint for Google OAuth. Sets authentication cookies and redirects to frontend.',
        responses: {
          '302': {
            description: 'Redirects to frontend with authentication cookies set',
            headers: {
              'Set-Cookie': {
                schema: {
                  type: 'string',
                  description: 'Authentication cookies (accessToken and refreshToken)'
                }
              }
            }
          },
          '401': {
            description: 'Authentication failed'
          }
        }
      }
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register new user',
        description: 'Register a new user with email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email'
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: 'User password'
                  },
                  name: {
                    type: 'string',
                    description: 'User name'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Registration successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'User ID'
                        },
                        email: {
                          type: 'string',
                          description: 'User email'
                        },
                        name: {
                          type: 'string',
                          description: 'User name'
                        },
                        role: {
                          type: 'string',
                          enum: ['admin', 'user'],
                          description: 'User role'
                        }
                      }
                    },
                    accessToken: {
                      type: 'string',
                      description: 'JWT access token'
                    },
                    refreshToken: {
                      type: 'string',
                      description: 'JWT refresh token'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Invalid input or user already exists'
          }
        }
      }
    },
    '/auth/refresh-token': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh access token',
        description: 'Get new access token using refresh token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['refreshToken'],
                properties: {
                  refreshToken: {
                    type: 'string',
                    description: 'Refresh token'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Token refresh successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      type: 'string',
                      description: 'New JWT access token'
                    },
                    refreshToken: {
                      type: 'string',
                      description: 'New JWT refresh token'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Invalid or expired refresh token'
          }
        }
      }
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout user',
        description: 'Invalidate current session and clear authentication cookies',
        responses: {
          '200': {
            description: 'Logout successful'
          },
          '401': {
            description: 'Not authenticated'
          }
        }
      }
    }
  }
}; 
