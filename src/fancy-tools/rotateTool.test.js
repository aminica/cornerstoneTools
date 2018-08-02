import RotateTool from './rotateTool.js';
import external from './../externalModules.js';

jest.mock('./../externalModules.js', () => ({
  cornerstone: {
    setViewport: jest.fn()
  }
}));

const mockEvt = {
  detail: {
    viewport: {
      rotation: 0
    }
  }
};

describe('rotateTool.js', () => {
  describe('default values', () => {
    it('has a default name of "rotate"', () => {
      const defaultName = 'rotate';
      const instantiatedTool = new RotateTool();

      expect(instantiatedTool.name).toEqual(defaultName);
    });

    it('can be created with a custom tool name', () => {
      const customToolName = 'customToolName';
      const instantiatedTool = new RotateTool(customToolName);

      expect(instantiatedTool.name).toEqual(customToolName);
    });
  });
  describe('activeMouseDownCallback', () => {
    it('should set initialRotation once mouse is click', () => {
      const instantiatedTool = new RotateTool();

      instantiatedTool.activeMouseDownCallback(mockEvt);
      expect(instantiatedTool.initialRotation).toBe(0);
    });
  });

  describe('dragCallback', () => {
    it('should call setViewport once drag event is done', () => {
      const instantiatedTool = new RotateTool();

      instantiatedTool.applyActiveStrategy = jest.fn();
      external.cornerstone.setViewport = jest.fn();

      instantiatedTool.dragCallback(mockEvt);
      expect(external.cornerstone.setViewport).toHaveBeenCalled();
    });
  });
});
