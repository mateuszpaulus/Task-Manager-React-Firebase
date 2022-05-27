import React from "react";
import { render, cleanup, fireEvent } from 'testing-library/react'
import { Checkbox } from '../componets/Checkbox'

beforeEach(cleanup);  // clean the DOM!

jest.