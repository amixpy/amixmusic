import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  padding: 20px;
  background: #2c3e50;
  color: white;
`;

const MainContent = styled.main`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const Sidebar = styled.aside`
  flex: 0 0 300px;
  background: #34495e;
  color: white;
  padding: 20px;
  border-radius: 8px;
`;

const PlayerArea = styled.section`
  flex: 1;
  background: #2c3e50;
  border-radius: 8px;
  padding: 20px;
`;

function App() {
  return (
    <Container>
      <Header>
        <h1>AmixMusic</h1>
        <p>Your lightweight music player</p>
      </Header>
      <MainContent>
        <Sidebar>
          <h2>Playlists</h2>
          <h2>Liked Songs</h2>
        </Sidebar>
        <PlayerArea>
          <h2>Now Playing</h2>
          <div>Audio Player UI will go here</div>
        </PlayerArea>
      </MainContent>
    </Container>
  );
}

export default App;
