import React from 'react';
import { Button } from 'semantic-ui-react'
import { auth } from '../Firebase';

const SignOutBtn = () => 
    <Button onClick={auth.signOut}>Sign Out</Button>

export default SignOutBtn;