# Copa Streaming Chat

## Backend (NestJS)
### General Setup
- [ ] Configure `.env` and environment variables
- [ ] Set up `main.ts` with app initialization
- [ ] Configure `app.module.ts` with all modules
- [ ] Set up global configuration in `config/configuration.ts`
- [ ] Implement and connect `prisma.service.ts`

### Auth Module
- [ ] Implement `auth.controller.ts`
- [ ] Implement `auth.service.ts`
- [ ] Set up `auth.module.ts`
- [ ] Create `dto/login.dto.ts`
- [ ] Create `dto/register.dto.ts`
- [ ] Implement JWT strategy in `strategies/jwt.strategy.ts`

### Video Call Module
- [ ] Set up WebSocket gateway in `video-call.gateway.ts`
- [ ] Implement video call logic in `video-call.service.ts`
- [ ] Configure `video-call.module.ts`
- [ ] Create `dto/create-room.dto.ts` and `join-room.dto.ts`
- [ ] Define `interfaces/peer.interface.ts`

### User Module
- [ ] Implement `user.controller.ts`
- [ ] Implement `user.service.ts`
- [ ] Configure `user.module.ts`
- [ ] Define `entities/user.entity.ts`

### Tests
- [ ] Write end-to-end test `test/app.e2e-spec.ts`
- [ ] Configure testing in `test/jest.config.ts`

## Frontend (Next.js)
### General Setup
- [ ] Configure `next.config.js`
- [ ] Setup global styles in `styles/globals.css`
- [ ] Define theme in `styles/theme.ts`

### Layout & Components
- [ ] Build base UI components in `components/ui/` (`Button`, `Input`, `Modal`)
- [ ] Implement layout in `components/Layout.tsx`

### Video Call Components
- [ ] Create `VideoPlayer.tsx`
- [ ] Create `Controls.tsx`
- [ ] Create `Participants.tsx`
- [ ] Implement `Chat.tsx`

### Contexts & Hooks
- [ ] Create `VideoCallContext.tsx`
- [ ] Create `AuthContext.tsx`
- [ ] Implement hooks: `useWebRTC.ts`, `useSocket.ts`, `useMediaStream.ts`

### Pages
- [ ] Implement landing page in `pages/index.tsx`
- [ ] Set up `_app.tsx` and `_document.tsx`
- [ ] Implement dynamic call room `pages/call/[roomId].tsx`
- [ ] Create login page `pages/auth/login.tsx`
- [ ] Create register page `pages/auth/register.tsx`
- [ ] Create test API route in `pages/api/hello.ts`

### Utilities
- [ ] Implement `utils/api.ts` for HTTP requests
- [ ] Set up WebRTC config in `utils/peer-config.ts`
- [ ] Define types in `types/video-call.d.ts`

## Shared Package
- [ ] Define types: `video-call.ts`, `user.ts`, `index.ts`
- [ ] Define socket events enum in `constants/events.ts`
- [ ] Implement shared validators in `utils/validation.ts`

## Prisma
- [ ] Define database schema in `schema.prisma`
- [ ] Create initial migration
- [ ] Implement seeding script `seed.ts`

## DevOps & Tooling
- [ ] Configure Docker services in `docker-compose.yml`
- [ ] Set up monorepo with `turbo.json`
- [ ] Complete root `package.json` configuration

## Documentation
- [ ] Update `README.md` with setup, usage, and contribution guidelines
