import {
  addLoader as addBundlessLoader,
  ILoaderItem,
} from '../../builder/bundless/loaders';
import {
  addTransformer as addJSTransformer,
  ITransformerItem,
} from '../../builder/bundless/loaders/javascript';
import { IApi, IFatherJSTransformerTypes } from '../../types';

export default async (api: IApi) => {
  // collect all bundless loaders
  const bundlessLoaders: ILoaderItem[] = await api.applyPlugins({
    key: 'addBundlessLoader',
    initialValue: [
      {
        id: 'js-loader',
        test: /((?<!\.d)\.ts|\.(jsx?|tsx))$/,
        loader: require.resolve('../../builder/bundless/loaders/javascript'),
      },
    ],
  });

  // register bundless loaders
  bundlessLoaders.forEach((l) => addBundlessLoader(l));

  // collect all bundless js transformers
  const jsTransformers: ITransformerItem[] = await api.applyPlugins({
    key: 'addJSTransformer',
    initialValue: [
      {
        id: IFatherJSTransformerTypes.BABEL,
        transformer: require.resolve(
          '../../builder/bundless/loaders/javascript/babel',
        ),
      },
      {
        id: IFatherJSTransformerTypes.ESBUILD,
        transformer: require.resolve(
          '../../builder/bundless/loaders/javascript/esbuild',
        ),
      },
    ],
  });

  // register js transformers
  jsTransformers.forEach((t) => addJSTransformer(t));
};
