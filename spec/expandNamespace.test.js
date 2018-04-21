const proxyquire = require( 'proxyquire' );
const path       = require( 'path' );

describe( 'The ./lib/expandNamespaces function', ()=>{

  it( 'should keep paths without namespaces unchanged', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub()
    } );

    const expected = './somePath';
    const actual   = expandNamespaces( expected );

    expect( actual ).to.equal( actual );

  } );

  it( 'should return the reative a path  after adding a ./ ', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub().returns( { namespaces: { alfa: '/path/to/alfa',beta: '/path/to/beta' } } )
    } );
    const expected         = '<alfa>/dir';
    const actual           = expandNamespaces( expected, process.cwd() );

    expect( path.relative( './path/to/alfa/dir',actual ) ).to.equal( '' );
  
  } );

  it( 'should return the orignal relative path if path starts with . ', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub().returns( { namespaces: { alfa: '/path/to/alfa',beta: '/path/to/beta' } } )
    } );
    const expected         = '<alfa>/dir';
    const actual           = expandNamespaces( expected, `${ process.cwd() }/second/path` );

    expect( path.relative( '..\\..\\path\\to\\alfa\\dir',actual ) ).to.equal( '' );
  
  } );


} );
