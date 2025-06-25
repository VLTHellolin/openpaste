import { Button, chakra, Container, Drawer, Heading, HStack, Portal, Spacer } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';
import { Link, NavLink } from 'react-router';
import { ColorModeButton } from './ui/color-mode';

const NavigationBar = chakra('nav', {
  base: {
    top: 0,
    position: 'sticky',
    display: 'flex',
    justifyContent: 'center',
    bg: 'bg',
    borderBottom: '1px solid',
    borderColor: 'border.muted',
    zIndex: 999,
    width: 'full',
    minHeight: '4rem',
  },
});

const NavigationTitle = () => {
  return (
    <Link to='/'>
      <Heading size='lg'>OpenPaste</Heading>
    </Link>
  );
};

const NavigationLink = chakra(NavLink, {
  base: {
    fontSize: 'sm',
    color: 'fg.muted',
    _hover: {
      color: 'fg',
    },
    _current: {
      color: 'fg',
      fontWeight: 'medium',
    },
    transition: 'colors',
  },
});

const DesktopNavigationContent = () => {
  return (
    <HStack hideBelow='md' py='2' gap='5' height='full'>
      <NavigationTitle />
      <NavigationLink to='/discover'>All Pastes</NavigationLink>
      <NavigationLink to='/search'>Search</NavigationLink>
      <Spacer />
      <ColorModeButton />
    </HStack>
  );
};

const MobileNavigationContent = () => {
  return (
    <HStack hideFrom='md'>
      <Drawer.Root placement='start'>
        <Drawer.Trigger asChild>
          <Button variant='outline'><LuMenu /></Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Menu</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <NavigationLink to='/discover'>All Pastes</NavigationLink>
                <NavigationLink to='/search'>Search</NavigationLink>
                <NavigationLink to='/'>My Profile</NavigationLink>
                <NavigationLink to='/settings'>Settings</NavigationLink>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
      <NavigationTitle />
      <ColorModeButton />
    </HStack>
  );
};

export const Navigation = () => {
  return (
    <NavigationBar>
      <Container>
        <DesktopNavigationContent />
        <MobileNavigationContent />
      </Container>
    </NavigationBar>
  );
};
