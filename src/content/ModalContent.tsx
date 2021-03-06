import React, { useEffect } from 'react';
import { Modal, ModalTitle } from '../components/Modal';
import { useAtom } from 'jotai';
import { modalOpen } from '../core/atoms';
import { toWords } from 'number-to-words';
import day from 'dayjs';
import { Close, Email, Github } from '../assets/icons';
import { ContactContainer, ContactRow } from '../components/ContactRow';
import { DiscordContactRow } from '../components/DiscordContactRow';
import styled from 'styled-components';
import { StyledGetInTouchButton } from '../components/GetInTouchButton';

const birthday = day('2 November 2004').toDate();
const ageDifMs = Date.now() - birthday.getTime();
const ageDate = new Date(ageDifMs);
const age = Math.abs(ageDate.getUTCFullYear() - 1970);

export const ModalContent = () => {
  const [open, setOpen] = useAtom(modalOpen);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [setOpen]);

  return (
    <Modal className={open ? 'open' : ''}>
      <ModalTopLevel>
        <ModalTitle>Alistair Smith</ModalTitle>
        <StyledGetInTouchButton onClick={() => setOpen(false)}>
          <Close />
        </StyledGetInTouchButton>
      </ModalTopLevel>
      <p>
        Hey, I'm a {toWords(age)} year old full-stack TypeScript engineer from the United Kingdom. I have a huge passion for
        creating and supporting open-source software, desktop & mobile applications, and responsive, performant code. Programming
        since seven, I've learned a lot about programming principles, scaling, and systems architecture. I consider myself
        forward-thinking and I always love to have a joke around.
      </p>
      <p>Get in touch</p>
      <ContactContainer>
        <DiscordContactRow />
        <ContactRow href={'mailto:inbox@alistair.cloud'}>
          <Email /> inbox@alistair.cloud
        </ContactRow>
        <ContactRow href={'https://github.com/alii'}>
          <Github /> alii
        </ContactRow>
      </ContactContainer>
    </Modal>
  );
};

const ModalTopLevel = styled.div`
  display: flex;
  align-items: center;

  h2 {
    flex: 1;
  }

  svg {
    height: 18px;
    width: 18px;
    fill: white;
    cursor: pointer;
  }
`;
